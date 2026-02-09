// 全局状态
let currentCategory = 'all';
let currentSearch = '';
let currentLang = localStorage.getItem('language') || 'zh'; // 默认中文
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

// DOM 元素
const recipesContainer = document.getElementById('recipes-container');
const searchInput = document.getElementById('search');
const randomBtn = document.getElementById('random');
const tabs = document.querySelectorAll('.tab');
const modal = document.getElementById('recipe-modal');
const closeModal = document.querySelector('.close');
const totalCount = document.getElementById('total-count');
const langToggle = document.getElementById('lang-toggle');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.querySelector('.close-settings');
const profileForm = document.getElementById('profile-form');
const clearProfileBtn = document.getElementById('clear-profile');

// 营养需求计算
function calculateNutritionNeeds(profile) {
    const { age, gender, weight, intensity } = profile;
    
    // 基础代谢率 (Harris-Benedict 公式)
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * 160) - (5.677 * age); // 假设平均身高160cm
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * 160) - (4.330 * age);
    }
    
    // 活动系数
    const activityFactors = {
        light: 1.5,
        moderate: 1.7,
        intense: 1.9,
        athlete: 2.2
    };
    
    // 每日总热量需求
    const calories = Math.round(bmr * activityFactors[intensity]);
    
    // 蛋白质需求 (运动员标准: 1.6-2.0g/kg)
    const proteinPerKg = {
        light: 1.2,
        moderate: 1.6,
        intense: 1.8,
        athlete: 2.0
    };
    const protein = Math.round(weight * proteinPerKg[intensity]);
    
    // 碳水化合物 (50-55% 总热量)
    const carbs = Math.round((calories * 0.525) / 4); // 4 cal/g
    
    // 脂肪 (20-30% 总热量)
    const fat = Math.round((calories * 0.25) / 9); // 9 cal/g
    
    return { calories, protein, carbs, fat };
}

// 计算营养占比
function calculateNutritionPercentage(recipeNutrition, dailyNeeds) {
    if (!dailyNeeds) return null;
    
    return {
        calories: Math.round((recipeNutrition.calories / dailyNeeds.calories) * 100),
        protein: Math.round((recipeNutrition.protein / dailyNeeds.protein) * 100),
        carbs: Math.round((recipeNutrition.carbs / dailyNeeds.carbs) * 100),
        fat: Math.round((recipeNutrition.fat / dailyNeeds.fat) * 100)
    };
}

// 语言切换
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('language', currentLang);
    updateLanguage();
    renderRecipes();
}

function updateLanguage() {
    // 更新语言按钮
    langToggle.textContent = currentLang === 'zh' ? '🌐 English' : '🌐 中文';
    
    // 更新所有带 data-zh 和 data-en 的元素
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
        el.textContent = el.dataset[currentLang];
    });
    
    // 更新搜索框 placeholder
    if (searchInput.dataset.zhPlaceholder && searchInput.dataset.enPlaceholder) {
        searchInput.placeholder = currentLang === 'zh' ? 
            searchInput.dataset.zhPlaceholder : 
            searchInput.dataset.enPlaceholder;
    }
}

// 保存 Profile
function saveProfile() {
    const profile = {
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        weight: parseFloat(document.getElementById('weight').value),
        sport: document.getElementById('sport').value,
        intensity: document.getElementById('intensity').value
    };
    
    profile.nutritionNeeds = calculateNutritionNeeds(profile);
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
    userProfile = profile;
    
    settingsModal.style.display = 'none';
    updateProfileIndicator();
    renderRecipes();
    
    alert(currentLang === 'zh' ? '✅ 设置已保存！' : '✅ Profile saved!');
}

// 加载 Profile 到表单
function loadProfileToForm() {
    document.getElementById('age').value = userProfile.age;
    document.getElementById('gender').value = userProfile.gender;
    document.getElementById('weight').value = userProfile.weight;
    document.getElementById('sport').value = userProfile.sport;
    document.getElementById('intensity').value = userProfile.intensity;
    previewNutrition();
}

// 预览营养需求
function previewNutrition() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const intensity = document.getElementById('intensity').value;
    
    if (age && gender && weight && intensity) {
        const needs = calculateNutritionNeeds({ age, gender, weight, intensity });
        const preview = document.getElementById('nutrition-preview');
        const goalsContainer = preview.querySelector('.nutrition-goals');
        
        const labels = currentLang === 'zh' ? 
            { calories: '卡路里', protein: '蛋白质', carbs: '碳水', fat: '脂肪' } :
            { calories: 'Calories', protein: 'Protein', carbs: 'Carbs', fat: 'Fat' };
        
        goalsContainer.innerHTML = `
            <div class="goal-item">
                <div class="goal-value">${needs.calories}</div>
                <div class="goal-label">${labels.calories}</div>
            </div>
            <div class="goal-item">
                <div class="goal-value">${needs.protein}g</div>
                <div class="goal-label">${labels.protein}</div>
            </div>
            <div class="goal-item">
                <div class="goal-value">${needs.carbs}g</div>
                <div class="goal-label">${labels.carbs}</div>
            </div>
            <div class="goal-item">
                <div class="goal-value">${needs.fat}g</div>
                <div class="goal-label">${labels.fat}</div>
            </div>
        `;
        
        preview.style.display = 'block';
    }
}

// 更新 Profile 指示器
function updateProfileIndicator() {
    const indicator = document.getElementById('user-profile-indicator');
    if (userProfile) {
        const text = currentLang === 'zh' ? 
            `👤 ${userProfile.age}岁 ${userProfile.gender === 'male' ? '男' : '女'} | ${userProfile.weight}kg` :
            `👤 ${userProfile.age}y ${userProfile.gender === 'male' ? 'M' : 'F'} | ${userProfile.weight}kg`;
        indicator.textContent = text;
        indicator.style.display = 'block';
    } else {
        indicator.style.display = 'none';
    }
}

// 初始化
function init() {
    updateLanguage();
    updateProfileIndicator();
    renderRecipes();
    updateStats();
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 语言切换
    langToggle.addEventListener('click', toggleLanguage);
    
    // 设置按钮
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
        if (userProfile) {
            loadProfileToForm();
        }
    });
    
    // 关闭设置
    closeSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    
    // Profile 表单提交
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile();
    });
    
    // 清除 Profile
    clearProfileBtn.addEventListener('click', () => {
        if (confirm(currentLang === 'zh' ? '确定要清除个人数据吗？' : 'Clear your profile data?')) {
            localStorage.removeItem('userProfile');
            userProfile = null;
            profileForm.reset();
            document.getElementById('nutrition-preview').style.display = 'none';
            document.getElementById('user-profile-indicator').style.display = 'none';
            settingsModal.style.display = 'none';
            renderRecipes();
        }
    });
    
    // 表单字段变化时预览营养需求
    ['age', 'gender', 'weight', 'intensity'].forEach(field => {
        document.getElementById(field).addEventListener('change', previewNutrition);
    });

    // 分类切换
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderRecipes();
        });
    });

    // 搜索
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderRecipes();
    });

    // 随机推荐
    randomBtn.addEventListener('click', () => {
        const filtered = getFilteredRecipes();
        if (filtered.length > 0) {
            const random = filtered[Math.floor(Math.random() * filtered.length)];
            showRecipeDetail(random);
        }
    });

    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
}

// 获取筛选后的菜谱
function getFilteredRecipes() {
    return recipes.filter(recipe => {
        const matchCategory = currentCategory === 'all' || recipe.category === currentCategory;
        const matchSearch = !currentSearch || 
            recipe.name.toLowerCase().includes(currentSearch) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(currentSearch));
        return matchCategory && matchSearch;
    });
}

// 渲染菜谱列表
function renderRecipes() {
    const filtered = getFilteredRecipes();
    
    if (filtered.length === 0) {
        const emptyText = currentLang === 'zh' ? 
            { title: '😔 没有找到菜谱', desc: '试试其他分类或搜索关键词吧' } :
            { title: '😔 No recipes found', desc: 'Try another category or search term' };
        recipesContainer.innerHTML = `
            <div class="empty-state">
                <h2>${emptyText.title}</h2>
                <p>${emptyText.desc}</p>
            </div>
        `;
        return;
    }

    const timeLabel = currentLang === 'zh' ? '分钟' : 'min';
    recipesContainer.innerHTML = filtered.map(recipe => {
        const name = currentLang === 'zh' ? recipe.name : recipe.nameEn;
        const tags = currentLang === 'zh' ? recipe.tags : recipe.tagsEn;
        return `
            <div class="recipe-card" onclick="showRecipeDetail(${recipe.id})">
                <img src="${recipe.image}" alt="${name}" class="recipe-image" onerror="this.src='${recipe.originalImage}'">
                <div class="recipe-info">
                    <div class="recipe-title">${name}</div>
                    <div class="recipe-meta">
                        <span>${'⭐'.repeat(recipe.rating)}</span>
                        <span>⏱️ ${recipe.time}${timeLabel}</span>
                    </div>
                    <div class="recipe-tags">
                        ${tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 显示菜谱详情
function showRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const name = currentLang === 'zh' ? recipe.name : recipe.nameEn;
    const timeLabel = currentLang === 'zh' ? '分钟' : 'min';
    const difficultyLabel = currentLang === 'zh' ? '难度' : 'Difficulty';
    const ingredientsTitle = currentLang === 'zh' ? '🥘 食材清单' : '🥘 Ingredients';
    const stepsTitle = currentLang === 'zh' ? '👨‍🍳 做法' : '👨‍🍳 Instructions';
    const tipsTitle = currentLang === 'zh' ? '💡 小贴士' : '💡 Tips';
    const tagsTitle = currentLang === 'zh' ? '🏷️ 标签' : '🏷️ Tags';
    const notesTitle = currentLang === 'zh' ? '📝 备注' : '📝 Notes';
    const dateLabel = currentLang === 'zh' ? '添加日期：' : 'Date added: ';
    
    const ingredients = recipe.ingredients.map(group => {
        const type = currentLang === 'zh' ? group.type : group.typeEn;
        const items = currentLang === 'zh' ? group.items : group.itemsEn;
        return `
            <h4>${type}</h4>
            <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    }).join('');
    
    const steps = recipe.steps.map(step => {
        const title = currentLang === 'zh' ? step.title : step.titleEn;
        const detail = currentLang === 'zh' ? step.detail : step.detailEn;
        return `<li><strong>${title}:</strong> ${detail}</li>`;
    }).join('');
    
    const tips = currentLang === 'zh' ? recipe.tips : recipe.tipsEn;
    const tags = currentLang === 'zh' ? recipe.tags : recipe.tagsEn;
    const notes = currentLang === 'zh' ? recipe.notes : recipe.notesEn;

    // 营养信息HTML
    let nutritionHtml = '';
    if (recipe.nutrition) {
        const nutritionTitle = currentLang === 'zh' ? '📊 营养成分' : '📊 Nutrition Facts';
        const caloriesLabel = currentLang === 'zh' ? '卡路里' : 'Calories';
        const proteinLabel = currentLang === 'zh' ? '蛋白质' : 'Protein';
        const carbsLabel = currentLang === 'zh' ? '碳水' : 'Carbs';
        const fatLabel = currentLang === 'zh' ? '脂肪' : 'Fat';
        
        let percentages = null;
        let percentageHtml = '';
        
        if (userProfile && userProfile.nutritionNeeds) {
            percentages = calculateNutritionPercentage(recipe.nutrition, userProfile.nutritionNeeds);
            const percentLabel = currentLang === 'zh' ? '满足你每日需求的' : 'of your daily goal';
            
            percentageHtml = `
                <div style="margin-top: 1rem; padding: 1rem; background: #fff3e0; border-radius: 8px;">
                    <strong style="color: #ff6348;">
                        ${currentLang === 'zh' ? '💪 这道菜为你提供：' : '💪 This meal provides:'}
                    </strong>
                    <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                        ${percentages.protein >= 25 ? '✅' : '📌'} ${proteinLabel}: <strong>${percentages.protein}%</strong> ${percentLabel}
                        ${percentages.protein >= 30 ? '<span class="nutrition-badge">' + (currentLang === 'zh' ? '高蛋白' : 'High Protein') + '</span>' : ''}
                    </div>
                </div>
            `;
        }
        
        nutritionHtml = `
            <div class="nutrition-info">
                <h3>${nutritionTitle}</h3>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <div class="nutrition-label">${caloriesLabel}</div>
                        <div class="nutrition-value">${recipe.nutrition.calories}</div>
                        ${percentages ? `<div class="nutrition-percentage">${percentages.calories}% ${currentLang === 'zh' ? '每日需求' : 'daily'}</div>` : ''}
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">${proteinLabel}</div>
                        <div class="nutrition-value">${recipe.nutrition.protein}g</div>
                        ${percentages ? `<div class="nutrition-percentage">${percentages.protein}% ${currentLang === 'zh' ? '每日需求' : 'daily'}</div>` : ''}
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">${carbsLabel}</div>
                        <div class="nutrition-value">${recipe.nutrition.carbs}g</div>
                        ${percentages ? `<div class="nutrition-percentage">${percentages.carbs}% ${currentLang === 'zh' ? '每日需求' : 'daily'}</div>` : ''}
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">${fatLabel}</div>
                        <div class="nutrition-value">${recipe.nutrition.fat}g</div>
                        ${percentages ? `<div class="nutrition-percentage">${percentages.fat}% ${currentLang === 'zh' ? '每日需求' : 'daily'}</div>` : ''}
                    </div>
                </div>
                ${percentageHtml}
            </div>
        `;
    }
    
    const detailHtml = `
        <img src="${recipe.image}" alt="${name}" class="recipe-detail-image" onerror="this.src='${recipe.originalImage}'">
        <h2>${name}</h2>
        <div class="recipe-meta">
            <span>${'⭐'.repeat(recipe.rating)} (${recipe.rating}/5)</span>
            <span>⏱️ ${recipe.time}${timeLabel}</span>
            <span>🍳 ${difficultyLabel}: ${'⭐'.repeat(recipe.difficulty)}</span>
        </div>
        
        ${nutritionHtml}
        
        <h3>${ingredientsTitle}</h3>
        ${ingredients}
        
        <h3>${stepsTitle}</h3>
        <ol>
            ${steps}
        </ol>
        
        <h3>${tipsTitle}</h3>
        <ul>
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        
        <h3>${tagsTitle}</h3>
        <div class="recipe-tags">
            ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        ${notes ? `
            <h3>${notesTitle}</h3>
            <p style="white-space: pre-line;">${notes}</p>
        ` : ''}
        
        <p style="margin-top: 2rem; color: #999; font-size: 0.9rem;">${dateLabel}${recipe.date}</p>
    `;

    document.getElementById('recipe-detail').innerHTML = detailHtml;
    modal.style.display = 'block';
}

// 更新统计
function updateStats() {
    totalCount.textContent = recipes.length;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
