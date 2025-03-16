document.addEventListener('DOMContentLoaded', function() {
    // Make the entire publications section expandable
    const publicationsSection = document.querySelector('.publications');
    if (publicationsSection) {
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
    }

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
    
    // No special handling for equations - let MathJax do its thing
});

// Wait for MathJax to be loaded and configured
window.addEventListener('load', function() {
    // Setup citation copy functionality
    setupCitationCopy();
});

// Handle citation copy functionality
function setupCitationCopy() {
    // Find all citation containers
    const citationContainers = document.querySelectorAll('.citation-container');
    
    citationContainers.forEach(function(container) {
        const copyButton = container.querySelector('.copy-button');
        const notification = container.querySelector('.copy-notification');
        const citationText = container.querySelector('.citation-text');
        
        if (copyButton && citationText) {
            copyButton.addEventListener('click', function() {
                // Create a temporary textarea element to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = citationText.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    // Execute copy command
                    document.execCommand('copy');
                    
                    // Show notification if it exists
                    if (notification) {
                        notification.textContent = 'Copied!';
                        notification.classList.add('visible');
                        
                        // Remove the visible class after animation completes
                        setTimeout(function() {
                            notification.classList.remove('visible');
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    
                    // Show error notification
                    if (notification) {
                        notification.textContent = 'Failed!';
                        notification.classList.add('visible');
                        
                        setTimeout(function() {
                            notification.classList.remove('visible');
                        }, 2000);
                    }
                }
                
                // Remove the temporary textarea
                document.body.removeChild(textarea);
            });
        }
    });
} 