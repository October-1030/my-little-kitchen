// 全局状态
let currentCategory = 'all';
let currentSearch = '';
let currentLang = localStorage.getItem('language') || 'zh'; // 默认中文

// DOM 元素
const recipesContainer = document.getElementById('recipes-container');
const searchInput = document.getElementById('search');
const randomBtn = document.getElementById('random');
const tabs = document.querySelectorAll('.tab');
const modal = document.getElementById('recipe-modal');
const closeModal = document.querySelector('.close');
const totalCount = document.getElementById('total-count');
const langToggle = document.getElementById('lang-toggle');

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

// 初始化
function init() {
    updateLanguage();
    renderRecipes();
    updateStats();
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 语言切换
    langToggle.addEventListener('click', toggleLanguage);

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

    const detailHtml = `
        <img src="${recipe.image}" alt="${name}" class="recipe-detail-image" onerror="this.src='${recipe.originalImage}'">
        <h2>${name}</h2>
        <div class="recipe-meta">
            <span>${'⭐'.repeat(recipe.rating)} (${recipe.rating}/5)</span>
            <span>⏱️ ${recipe.time}${timeLabel}</span>
            <span>🍳 ${difficultyLabel}: ${'⭐'.repeat(recipe.difficulty)}</span>
        </div>
        
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
