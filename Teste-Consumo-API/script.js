//Listar todos os livros na tela
function exibirLivros(livros){
    const container = document.querySelector('.livros');
    livros.forEach(livro => {
        const div = document.createElement('div');
        div.textContent = "Título: " + livro.title + " - Autor: " + livro.author;
        container.appendChild(div);
    });
}

//Listar um livro na tela
function exibirLivro(livro, id){
    const container = document.getElementById(id);
    container.textContent = '';
    const div = document.createElement('div');
    if(livro.title != undefined){
        div.textContent = "Título: " + livro.title + " - Autor: " + livro.author;
    }else{
        div.textContent = "Livro não encontrado";
    }
    container.appendChild(div);
}


// Pegar todos os livros na API
fetch('http://localhost:3000/books')
.then(res => res.json())
.then(data => {
    exibirLivros(data);
})
.catch(error => console.log('Ocorreu um erro: ',error));

// Pegar um livro na API
document.querySelector('.pesquisa-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.querySelector('#idget').value;
    const url = 'http://localhost:3000/books/' + id;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        exibirLivro(data,'resultadoPesquisa');
    })
    .catch(error => console.log('Ocorreu um erro: ',error));
    console.log(id);
    id.value = '';
});