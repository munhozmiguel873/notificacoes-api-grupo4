module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define("Evento", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: DataTypes.TEXT,
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        local: DataTypes.STRING,
        capacidade: DataTypes.INTEGER,
        banner: DataTypes.STRING
    }, {
        tableName: "eventos",
        timestamps: true,
        underscored: true,
    });

    return Evento;
};