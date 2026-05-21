module.exports = (sequelize, DataTypes) => {
    const Inscricao = sequelize.define("Inscricao", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dataInscricao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM("confirmada", "cancelada"),
            defaultValue: "confirmada",
        },
    }, {
        tableName: "inscricoes",
        timestamps: true,
        underscored: true,
    });

    return Inscricao;
};