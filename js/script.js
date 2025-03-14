document.addEventListener('DOMContentLoaded', function() {
    // Make the entire publications section expandable
    const publicationsSection = document.querySelector('.publications');
    const publicationsHeading = publicationsSection.querySelector('h2');
    const publicationsList = publicationsSection.querySelector('.publication-list');
    
    // Add toggle button to the publications heading
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'section-toggle-btn';
    toggleBtn.innerHTML = '<span class="icon">▼</span>';
    toggleBtn.setAttribute('aria-label', 'Toggle publications section');
    publicationsHeading.appendChild(toggleBtn);
    
    // Make the heading clickable
    publicationsHeading.style.cursor = 'pointer';
    publicationsHeading.style.display = 'flex';
    publicationsHeading.style.justifyContent = 'space-between';
    publicationsHeading.style.alignItems = 'center';
    
    // Set initial state (expanded)
    let isExpanded = true;
    
    // Function to toggle visibility
    const togglePublications = function(e) {
        if (e) {
            e.preventDefault();
        }
        
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            publicationsList.style.display = 'block';
            toggleBtn.querySelector('.icon').textContent = '▼';
        } else {
            publicationsList.style.display = 'none';
            toggleBtn.querySelector('.icon').textContent = '▶';
        }
    };
    
    // Add click event to toggle visibility
    toggleBtn.addEventListener('click', togglePublications);
    
    // Make the entire heading clickable
    publicationsHeading.addEventListener('click', function(e) {
        if (e.target !== toggleBtn && e.target !== toggleBtn.querySelector('.icon')) {
            togglePublications(e);
        }
    });

    // Add functionality for the publications page
    if (window.location.pathname.includes('publications.html')) {
        // Make publication abstracts expandable
        const publicationItems = document.querySelectorAll('.publication-item');
        
        publicationItems.forEach(item => {
            const abstract = item.querySelector('.abstract');
            if (!abstract) return;
            
            // Initially hide abstracts
            abstract.style.display = 'none';
            
            // Add toggle button to each publication title
            const title = item.querySelector('h3');
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.innerHTML = '<span class="icon">▶</span>';
            toggleBtn.setAttribute('aria-label', 'Toggle abstract');
            title.appendChild(toggleBtn);
            
            // Add click event to toggle visibility
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isVisible = abstract.style.display !== 'none';
                
                if (isVisible) {
                    abstract.style.display = 'none';
                    toggleBtn.querySelector('.icon').textContent = '▶';
                } else {
                    abstract.style.display = 'block';
                    toggleBtn.querySelector('.icon').textContent = '▼';
                }
            });
            
            // Make the entire title clickable
            title.addEventListener('click', function(e) {
                if (e.target.tagName !== 'A' && e.target !== toggleBtn && e.target !== toggleBtn.querySelector('.icon')) {
                    e.preventDefault();
                    toggleBtn.click();
                }
            });
        });
    }
}); 