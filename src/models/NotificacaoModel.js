module.exports = (sequelize, DataTypes) => {
    const Notificacao = sequelize.define("Notificacao", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: DataTypes.ENUM("confirmacao", "lembrete"),
        destinatarioEmail: DataTypes.STRING,
        assunto: DataTypes.STRING,
        conteudo: DataTypes.TEXT,
        dataEnvio: DataTypes.DATE,
        enviada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        tableName: "notificacoes",
        timestamps: true,
        underscored: true,
    });

    return Notificacao;
};