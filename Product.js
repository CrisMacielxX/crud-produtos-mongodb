import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        nome: String,
        categoria: String,
        preco: Number,
        quantidade: Number,
        disponivel: Boolean
    },
    { collection: "produtos"}
);

export default mongoose.model("Produto", ProductSchema)