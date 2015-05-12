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
        return (
            React.createElement("section", {className: "listar"}

            )
        );
    }
});
