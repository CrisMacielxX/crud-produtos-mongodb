import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./Product.js";

dotenv.config();

const app = express()
const PORT = 1998
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado com o MONGODB")
    } catch (error) {
        console.log("Erro ao conectar o MONGODB ", error)
    }
}

connectDB()

app.post("/product", async (req, res) => {
    try {
        const novoProduto = await Product.create(req.body)
        res.json(novoProduto)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/product", async (req, res) => {
    try {
        const produtos = await Product.find()
        res.json(produtos)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.put("/product/:id", async (req, res) => {
    try {
        const produtoAtualizado = await Product.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(produtoAtualizado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.delete("/product/:id/delete", async (req, res) => {
    try {
        const produtoDeletado = await Product.findByIdAndDelete(req.params.id)
        res.json(produtoDeletado)
    } catch (error) {
        res, json({ error: error.message })
    }
})

app.get("/product/ativo", async (req, res) => {
    try {
        const produtos = await Product.find({
            disponivel: true
        })
        res.json(produtos)
    } catch (error) {
        res, json({ error: error.message })
    }
})

app.get("/product/categoria/:categoria", async (req, res) => {
    try {
        const produtos = await Product.find({
            categoria: req.params.categoria
        })
        res.json(produtos)
    } catch (error) {
        res, json({ error: error.message })
    }
})

app.get("/product/price/:valor", async (req, res) => {
    try {
        const valor = Number(req.params.valor)

        if (valor < 0) {
            res, json({ error: "Preço inválido" })
        }


        const produtos = await Product.find({
            preco: { $lt: valor }
        })

        res.json(produtos)
    } catch (error) {
        res, json({ error: error.message })
    }
})

app.get("/product/low-stock", async (req, res) => {
    try {
        const produtos = await Product.find({
            quantidade: { $lt: 5 }
        })

        res.json(produtos)

    } catch (error) {
        res, json({ error: error.message })
    }
})

app.patch("/product/:id/availability", async (req, res) => {
    try {
        const produto = await Product.findByIdAndUpdate(
            req.params.id,
            { disponivel: req.body.disponivel },
            { new: true }
        )

        res.json(produto)

    } catch (error) {
        res, json({ error: error.message })
    }
})

app.listen(PORT, () =>
    console.log("O servidor está rodando na porta: ", PORT))