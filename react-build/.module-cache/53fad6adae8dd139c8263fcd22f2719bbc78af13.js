var ListaTarefas = React.createClass({displayName: "ListaTarefas",
    getInitialState: function(){
        return { _lista: [] };
    },

    componentDidMount: function(){
        if (localStorage.getItem('minhaLista') != null)
            this.setState({_lista: JSON.parse(localStorage.getItem('minhaLista'))});
    },

    render: function(){
        return (
            React.createElement("main", {className: "geral"},
                React.createElement("h1", null, "Lista de Tarefas"),

                React.createElement(ListaForm, {lista: this.state._lista}),

                React.createElement(ListaItens, {lista: this.state._lista})
            )
        );
    }
});

var ListaForm = React.createClass({displayName: "ListaForm",
    componentDidMount: function(){
        this._lista = this.props.lista;
        this._campo = document.querySelector('#tarefa');
    },

    inserirTarefa: function(){
        if (this._campo.value.length > 0){
            this._lista.push({tarefa: this._campo.value, status: 0});
            localStorage.setItem('minhaLista', JSON.stringify(this._lista));
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
        var todasTarefas;

        return (
            React.createElement("section", {className: "lista"},
                todasTarefas
            )
        );
    }
});

var ListaItem = React.createClass({displayName: "ListaItem",
    render: function(){
        return (
            React.createElement("div", {className: "item", id: "tarefa-"+this.props.chave, "data-id": this.props.chave, onClick: meuApp.marcarTarefa},
                React.createElement("div", {className: "status "+_status, id: "status-"+this.props.chave, "data-id": this.props.chave}, " "),
                React.createElement("div", {className: "texto ", id: "text-"+this.props.chave, "data-id": this.props.chave}, this.props.tarefa),
                React.createElement("div", {className: "del", id: "del-"+this.props.chave, "data-id": this.props.chave}, "X")
            )
        );
    }
});

React.render(React.createElement(ListaTarefas, null), document.querySelector('.container'));
