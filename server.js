module.exports = () => {
    const data = {
        products: []
    }

    for (let i = 0; i < 1000; i++){
        const min = 20.50
        const max = 130

        data.products.push({
            id: i + 1,
            price: Number(((Math.random() * (max - min)/ (Math.random() * (min * 0.1))) + min).toFixed(2)),
            title: 'Camiseta \0'.replace(/\0/, i + 1)
        })
    }
    
    return data
}