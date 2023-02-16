// for Animation 
$(document).ready(function () {
    setTimeout(() => {
        $("#div1").addClass("image_rotate");
    }, 1000);
    // confirm("Yes");
    setTimeout(() => {
        $("#div1").hide();
    }, 2000);
    setTimeout(() => {
        $("#div2").hide();
        $("#maindiv").show();
    }, 1700);

    i_box.src = "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg";
});

// load images  
function getImage() {
    document.getElementById("loader_img").src = "./loader.gif";
    var api = `https://api.imgflip.com/get_memes`
    // origin api 
    // https://api.imgflip.com/get_memes

    fetch("https://api.imgflip.com/get_memes").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.success == true) {
            // console.log(data)
            // console.log(data.data.memes)
            for (let meme in data.data.memes) {
                load_card(data.data.memes[meme]);
            }
        }
    })

    document.getElementById("get_btn").style = "display:None";
    document.getElementById("loader_img").style = "display:None";
}

function load_card(temp_meme){
    card = `
    <div class="card">
        <div class="card__content">
            <div class="card_img">
                <img src="${temp_meme.url}" alt="" srcset="">
            </div>
            <span class="card__content_text">${temp_meme.name}</span>
            <div class="btn_holder">

                <button class="cssbuttons-io-button" onclick="save_image('${temp_meme.url}','${temp_meme.name}')">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
                            fill="currentColor"></path>
                    </svg>
                    <span>Download</span>
                </button>
            </div>
        </div>
    </div>
    `;
    document.getElementById("card_container").innerHTML += card;
}

function save_image(url,name) {
    fetch(url)
        .then(resp => resp.blob())
        .then(blobobject => {
            const blob = window.URL.createObjectURL(blobobject);
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = blob;
            anchor.download = name+".jpeg";
            document.body.appendChild(anchor);
            anchor.click();
            window.URL.revokeObjectURL(blob);
        })
        .catch(() => console.log('An error in downloadin gthe file sorry'));
}