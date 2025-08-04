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
            <div class="color-box" style="background-color: ${color};"></div>
            <hr />
        `;
    }
    document.getElementById("colorSchemeContainer").innerHTML = html;
    }

async function buttonClick() {
    await getDataAPI();
    renderPosts();
    

}








   
    
