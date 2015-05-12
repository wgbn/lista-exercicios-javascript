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
