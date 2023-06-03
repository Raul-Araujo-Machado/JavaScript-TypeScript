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

//Adicionar um livro na tela
function exibirAdicao(res){
    const container = document.getElementById('resultadoAdicao');
    container.textContent = '';
    const div = document.createElement('div');
    if(res['ok']){
        div.textContent = "Livro adicionado com sucesso";
    }else{
        div.textContent = "Erro ao adicionar livro";
    }
    container.appendChild(div);
}

// Atualizar um livro na tela
function exibirAtt(res){
    const container = document.getElementById('resultadoAtt');
    container.textContent = '';
    const div = document.createElement('div');
    if(res['ok']){
        div.textContent = "Livro atualizado com sucesso";
    }else{
        div.textContent = "Erro ao atualizar livro";
    }
    container.appendChild(div);
}

// Deletar um livro na tela
function exibirDelecao(res){
    const container = document.getElementById('resultadoDelecao');
    container.textContent = '';
    const div = document.createElement('div');
    if(res['ok']){
        div.textContent = "Livro deletado com sucesso";
    }else{
        div.textContent = "Erro ao deletar livro";
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

// Adicionar um livro na API
document.querySelector('.adicao-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.querySelector('#idpost');
    const titulo = document.querySelector('#titulopost');
    const autor = document.querySelector('#autorpost');
    const newBook = {
        id: id.value,
        title: titulo.value,
        author: autor.value
    }

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    })
    .then(res => {
        console.log(res.data);
        exibirAdicao(res);
    })
    .catch(error => console.log('Ocorreu um erro: ',error));

    titulo.value = '';
    autor.value = '';
    id.value = '';
});

// Atualizar um livro na API
document.querySelector('.att-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.querySelector('#idput');
    const titulo = document.querySelector('#tituloput');
    const autor = document.querySelector('#autorput');
    const newBook = {
        title: titulo.value,
        author: autor.value
    }
    fetch('http://localhost:3000/books/' + id.value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    })
    .then(res => {
        console.log(res.data);
        exibirAtt(res);
    })
    .catch(error => console.log('Ocorreu um erro: ',error));

    titulo.value = '';
    autor.value = '';
    id.value = '';
});

// Deletar um livro na API
document.querySelector('.del-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.querySelector('#iddelete');
    fetch('http://localhost:3000/books/' + id.value, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(res.data);
        exibirDelecao(res);
    })
    .catch(error => console.log('Ocorreu um erro: ',error));

    id.value = '';
});