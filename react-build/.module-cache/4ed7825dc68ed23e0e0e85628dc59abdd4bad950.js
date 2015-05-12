var _lista = [];

var ListaTarefas = React.createClass({displayName: "ListaTarefas",
    componentDidMount: function(){
        if (localStorage.getItem('minhaLista') != null)
            _lista = JSON.parse(localStorage.getItem('minhaLista'));
    },

    render: function(){
        return (
            React.createElement("main", {className: "geral"},
                React.createElement("h1", null, "Lista de Tarefas"),

                React.createElement(ListaForm, null),

                React.createElement(ListaItens, {lista: _lista})
            )
        );
    }
});

var ListaForm = React.createClass({displayName: "ListaForm",
    componentDidMount: function(){
        this._campo = document.querySelector('#tarefa');
    },

    inserirTarefa: function(){
        if (this._campo.value.length > 0){
            _lista.push({tarefa: this._campo.value, status: 0});
            localStorage.setItem('minhaLista', JSON.stringify(_lista));
            this._campo.value = '';
        } else {
            alert('Preencha uma tarefa');
        }
    },

    render: function(){
        return (
            React.createElement("section", {className: "barra clearfix"},
                React.createElement("input", {type: "text", id: "tarefa", maxlength: "1000"}),
                React.createElement("button", {onClick: this.inserirTarefa}, "inserir")
            )
        );
    }
});

var ListaItens = React.createClass({displayName: "ListaItens",
    getInitialState: function(){
        return { _lista: this.props.lista };
    },

    render: function(){
        var todasTarefas = this.state._lista.map(function (_val, _key) {
            return React.createElement(ItemLista, {chave: _key, tarefa: _val.tarefa, status: _val.status});
        });

        return (
            React.createElement("section", {className: "lista"},
                todasTarefas
            )
        );
    }
});

var ListaItem = React.createClass({displayName: "ListaItem",
    marcarTarefa: function(e){
        // testa se foi clicado apagar tarefa
        if (e.target.className == 'del'){
            // remove da lista de tarefas
            this.props.lista.splice(e.target.dataset.id, 1);
        } else {
            // altera o valor do status da tarefa na lista de tarefas
            this.props.lista[e.target.dataset.id].status = !this.props.lista[e.target.dataset.id].status;

            // altera a formatação do texto na tarefa
            e.target.setAttribute('class', 'texto'+(this.props.lista[e.target.dataset.id].status ? ' concluido':''));

            // altera a cor do status da tarefa
            document.getElementById("status-"+e.target.dataset.id).setAttribute('class', 'status '+(this.props.lista[e.target.dataset.id].status ? 'fundo-verde':'fundo-vermelho'));
        }
    },

    getInitialState: function() {
        return {status: this.props.status || 0};
    },

    toggle: function() {
        this.setState({status: !this.state.status});
    },

    render: function(){
        return (
            React.createElement("div", {className: "item", id: "tarefa-"+this.props.chave, "data-id": this.props.chave, onClick: this.marcarTarefa},
                React.createElement("div", {className: "status "+_status, id: "status-"+this.props.chave, "data-id": this.props.chave}, " "),
                React.createElement("div", {className: "texto ", id: "text-"+this.props.chave, "data-id": this.props.chave}, this.props.tarefa),
                React.createElement("div", {className: "del", id: "del-"+this.props.chave, "data-id": this.props.chave}, "X")
            )
        );
    }
});

React.render(React.createElement(ListaTarefas, null), document.querySelector('.container'));
