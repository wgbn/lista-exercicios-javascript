var ListaTarefas = React.createClass({displayName: "ListaTarefas",
    render: function(){
        return (
            React.createElement("main", {className: "geral"},
                React.createElement("h1", null, "Lista de Tarefas"),

                React.createElement(ListaForm, null),

                React.createElement(ListaTarefas, null)
            )
        );
    }
});

var ListaForm = React.createClass({displayName: "ListaForm",
    render: function(){
        return (
            React.createElement("section", {className: "barra clearfix"},
                React.createElement("input", {type: "text", id: "tarefa", maxlength: "1000"}),
                React.createElement("button", null, "inserir")
            )
        );
    }
});

var ListaTarefas = React.createClass({displayName: "ListaTarefas",
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
                React.createElement("div", {className: "status "+_status, id: "status-"+this.props.chave, "data-id": this.props.chave}),
                React.createElement("div", {className: "texto ", id: "text-"+this.props.chave, "data-id": this.props.chave}, this.props.tarefa),
                React.createElement("div", {className: "del", id: "del-"+this.props.chave, "data-id": this.props.chave}, "X")
            )
        );
    }
});
