let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch("/post")
                .then(res => res.json())
                .then(data => {
                    let posts = document.getElementsByClassName("posts")[0];
                    posts.innerHTML = data.reduce((cadena, element) => {
                        return cadena +
                            ` 
                            <article class="post-article">
                <p class="info-post">${element.post}</p>
                <button class="btn-ice"><i class="far fa-snowflake"></i></button>
            </article>
                            `
                    }, "");
        
                });
        }
        let form = document.forms.savePost;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            fetch(form.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form))
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    form.post.value="";
                    loadContent();
                });
        });

        loadContent();

    }
};
window.onload = () => app.init();