module.exports = (sequelize, DataTypes) => {
    const Participante = sequelize.define("Participante", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
    }, {
        tableName: "participantes",
        timestamps: true,
        underscored: true,
    });

    return Participante;
};