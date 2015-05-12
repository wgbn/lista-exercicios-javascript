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
        var _tagLista = document.querySelector('.listar');

        var Lista = React.createClass({displayName: "Lista",
            getInitialState: function() {
                return {lista: meuApp._lista};
            },
            render: function () {
                var asTarefas = this.state.lista.map(function (_val, _key) {
                    return React.createElement(ItemLista, {chave: _key, tarefa: _val.tarefa, status: _val.status});
                });

                return (
                    React.createElement("div", {className: "lista"}, asTarefas)
                );
            }
        });

        var ItemLista = React.createClass({displayName: "ItemLista",
                getInitialState: function() {
                    return {status: this.props.status || 0};
                },
                toggle: function () {
                    this.setState({status: !this.state.status});
                },
                render: function () {
                    var _status = (this.state.status ? 'fundo-verde':'fundo-vermelho');
                    return (
                        React.createElement("div", {className: "item", id: "tarefa-"+this.props.chave, "data-id": this.props.chave},
                            React.createElement("div", {className: "status "+_status, "data-id": this.props.chave}, " "),
                            React.createElement("div", {className: "texto ", "data-id": this.props.chave}, this.props.tarefa),
                            React.createElement("div", {className: "del", onclick: meuApp.marcarTarefa, "data-id": this.props.chave}, "X")
                        )
                    );
                }
        });

        React.render(React.createElement(Lista, null), _tagLista);
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
        console.info('marcarTarefa');

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
