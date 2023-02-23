class ProductManager{
    constructor(){
        this.products = [];
    }
    addProduct(product){
        const {prodName, prodDescription, prodCategory, prodPrice, prodThumbnail, prodStock, prodCode} = product;
        
        const prodToArray = {
            id: 1,
            product: prodName,
            description: prodDescription,
            category: prodCategory,
            price: prodPrice,
            thumbnail: prodThumbnail,
            stock: prodStock,
            code: prodCode,
        }

        const isValid = validateParams(product)
        
        //console.log(isValid)
        
        if(isValid){
            // Busca el código del producto y si existe no lo agrega,
            // caso contrario agregará el producto con un ID incremental.
            const exist = this.products.some(p => p.code === prodToArray.code);
            if(exist){
                console.log('El producto existe');
            } else {
                prodToArray.id = this.products.length + 1;
                this.products.push(prodToArray);
            }
        } else {
            console.log('Debes completar todos los campos');
        }

        console.log(this.products);        
    }
    getProductById(id){
        const prod = this.products.find( p => p.id === id);
        //console.log(prod);

        if(prod === undefined){
            console.log('Not found');
        } else {
            return prod;
        }
    }
    getProducts(){
        return this.products;
    }
}

class Product{
    constructor(prodName, description, category, price, thumbnail, stock, prodCode){
        this.prodName = prodName;
        this.prodDescription = description;
        this.prodCategory = category;
        this.prodPrice = price;
        this.prodThumbnail = thumbnail;
        this.prodStock = stock;
        this.prodCode = prodCode;
    }
}

//funciones de validación de strings y numbers.
function validateParams(product){
    const { prodName, prodDescription, prodCategory, prodPrice, prodThumbnail, prodStock, prodCode } = product;
    
    let isValid;

    //Validación de parámetros creo un objeto, 
    const objectValidation = {
        validName: validateStringParams(prodName),
        validDesc: validateStringParams(prodDescription),
        validCategory: validateStringParams(prodCategory),
        validThumbnail: validateStringParams(prodThumbnail),
        validPrice: validateNumberParams(prodPrice),
        validStock: validateNumberParams(prodStock),
        validCode: validateStringParams(prodCode),
    }

    if(Object.values(objectValidation).every(el => el === true)){
        isValid = true;
    } else {
        isValid = false;
    }

    return isValid;
}
function validateStringParams(stringParam){
    
    let isValid;
    
    if(stringParam === undefined){
        isValid = false;
    } else if(!isNaN(stringParam)){
        isValid = false;
    } else if (stringParam.trim() === ""){
        isValid = false;
    }else {
        isValid = true;
    }
    return isValid;
}
function validateNumberParams(numberParam){
    
    let isValid;
    if(numberParam === undefined){
        isValid = false;
    } else if (isNaN(numberParam)){
        isValid = false;
    } else {
        isValid = true;
    }
    return isValid;
}


const productManager = new ProductManager();
productManager.addProduct(new Product('remera','100% algodon','indumentaria',5000,'no photo',25000,'HB150A'));

productManager.getProducts();
