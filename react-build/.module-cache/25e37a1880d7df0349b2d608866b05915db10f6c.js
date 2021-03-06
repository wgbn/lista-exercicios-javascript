var meuApp = {
    _lista: [], // lista de tarefas
    _btnInserir: null, // botao de inserir

    init: function(){
        // adiciona evento ao botao de inserir
        meuApp._btnInserir = document.querySelector('.barra button').addEventListener('click', meuApp.inserirTarefa);

        // verifica se há uma lista na memoria
        if (localStorage.getItem('minhaLista') != null){
            // pega esta lista
            meuApp._lista = JSON.parse(localStorage.getItem('minhaLista'));
        }

        // exibe a lista
        meuApp.printTarefas();
    },

    printTarefas: function(){
        // pega o elemento que contará a lista
        var _tagLista = document.querySelector('.lista');

        var ShoppingBox = React.createClass({displayName: "ShoppingBox",
            handleProductSubmit: function(product) {
                var products = this.state.data;
                products.push(product);
                this.setState({data: products});
            },
            getInitialState: function() {
                return {data: []};
            },
            render: function () {
                return (
                    React.createElement("div", null,
                        React.createElement("h1", null, "Minha Lista de Compras"),
                        React.createElement(ShoppingTable, {data: this.state.data}),
                        React.createElement(ShoppingForm, {onProductSubmit: this.handleProductSubmit})
                    )
                );
            }
        });
    },

    inserirTarefa: function(e){
        // pega o elemento textinpu de inserção de tarefa
        var _txt = document.getElementById('tarefa');

        // testa se foi preenchido
        if (_txt.value.length > 0){
            // incrementa a lista de tarefas
            meuApp._lista.push({tarefa: _txt.value, status: 0});

            // salva na memória
            localStorage.setItem('minhaLista', JSON.stringify(meuApp._lista));

            // atualiza a lista na pagina
            meuApp.printTarefas();

            // limpa o textinput
            _txt.value = '';
        } else {
            // exibe erro ao usuario
            alert('Escreva uma tarefa');
        }
    },

    marcarTarefa: function(e){
        // testa se foi clicado apagar tarefa
        if (e.target.className == 'del'){
            // remove da lista de tarefas
            meuApp._lista.splice(this.dataset.id, 1);

            // atualiza a lista na página
            meuApp.printTarefas();
        } else {
            // altera o valor do status da tarefa na lista de tarefas
            meuApp._lista[this.dataset.id].status = !meuApp._lista[this.dataset.id].status;

            // altera a formatação do texto na tarefa
            this.children[1].setAttribute('class', 'texto'+(meuApp._lista[this.dataset.id].status ? ' concluido':''));

            // altera a cor do status da tarefa
            this.children[0].setAttribute('class', 'status '+(meuApp._lista[this.dataset.id].status ? 'fundo-verde':'fundo-vermelho'));
        }

        // salva na memória
        localStorage.setItem('minhaLista', JSON.stringify(meuApp._lista));
    }

};

// inicia a lista de tarefas
meuApp.init();
