const colorPick = document.getElementById("colorInput");
const colorSchemeSelect = document.getElementById("colorSchemeSelect"); 
const colorArray = []

   


    async function getDataAPI(){
      const selectedScheme = colorSchemeSelect.value;
      const colorValue = colorPick.value;
      
        colorArray.length = 0;

        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue.slice(1)}&mode=${selectedScheme}&count=6`);
        const data = await response.json();
        
        const hexValues = data.colors.map(color => color.hex.value);
        console.log('All hex values:', hexValues);
        colorArray.push(...hexValues);
    }
    
    function renderPosts() {
    let html = "";
    for (let color of colorArray) {
        html += `
            <div class="color-box" style="background-color: ${color};" onclick="copyToClipboard('${color}')">
            <h2>${color}</h2>
            </div>
            <hr />
        `;
    }
    document.getElementById("colorSchemeContainer").innerHTML = html;
    }
    function copyToClipboard(color) {
        navigator.clipboard.writeText(color).then(() => {
            alert(`Copied ${color} to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }


    function setLoading(isLoading) {
    const button = document.getElementById("generateButton");
    
    if (isLoading) {
        button.textContent = "Generating...";
        button.disabled = true;
        button.classList.add("loading");
    } else {
        button.textContent = "Generate Color Scheme";
        button.disabled = false;
        button.classList.remove("loading");
    }
}
   async function buttonClick() {
    try {
        setLoading(true); 
        await getDataAPI();
        renderPosts();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
}








   
    
