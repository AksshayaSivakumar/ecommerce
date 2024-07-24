const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.find()
  .then((products)=>{
    console.log(products)
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
    .catch(err=>console.log(err));
  
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product=>{
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err=>console.log(err));
};



exports.getIndex = (req, res, next) => {
  Product.find()
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
    .catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  //console.log(req.user.Cart)
//}
  req.user
  .getCart()
  .then(products=>{
     res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
  
  .catch(err=>console.log(err));
 
};

exports.deleteDetails=(req,res,next)=>{
  
  // const prodId = req.params.productId;
  // Product.deleteDetails(prodId)
  // .then((product)=>{
  //   res.render('shop/index', {
  //     prods: product,
  //     pageTitle: product.title,
  //     path: '/delete'
      
  //   });
  // })
  // .catch(err=>console.log(err));
  // res.redirect('/');
};


exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  console.log(prodId)
  Product.findById(prodId).then(product=>{
    console.log(product,"hi")
    return req.user.addToCart(product);
    
  })
  .then(result=>{
    console.log(result);
    res.redirect('/cart');
  })
  // let fetchedCart;
  // let newQuantity=1;
  // req.user
  // .getCart()
  // .then(cart=>{
  //    fetchedCart=cart;
  //   return cart.getProducts({where:{id:prodId}});
  // })
  // .then(products=>{
  //   let product;
  //   if(products.length>0)
  //   {
  //     product=products[0];
  //   }
    
  //   if(product)
  //   {
  //     let oldQuantity=product.cartitem.quantity;
  //     newQuantity=oldQuantity+1;
  //     return product;
      
  //   }
  //   return Product.findByPk(prodId)
  // })
  //   .then(product=>{
  //     console.log(product)
  //     return fetchedCart.addProduct(product,{
        
  //       through:{quantity:newQuantity}
  //     })
  //   })
  //   .catch(err=>console.log(err))

  //   .then(()=>{
  //     res.redirect('/cart')
  // })
  //   .catch(err=>console.log(err))

}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId=req.body.productId;
  req.user
  . deleteItemFromCart(prodId)
  .then(result=>{
    res.redirect('/cart');
  })
  .catch(err=>console.log(err));
};

exports.postOrder = (req,res, next)=>{
  let fetchedCart;
  req.user
  .addOrder()
  .then(result=>{
    res.redirect('/orders');
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders()
  .then(orders=>{
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders:orders
  });
})
};


