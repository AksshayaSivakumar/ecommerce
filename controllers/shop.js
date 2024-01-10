const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem=require('../models/cartitem');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
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
  Product.findAll({where:{id:prodId}}) 
  .then(products=>{
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products.title,
      path: '/products'
    });
  })
  .catch(err=>console.log(err));
};
// Product.findById(prodId)
// .then(products=>{
//   res.render('shop/product-detail', {
//     product: products,
//     pageTitle: products.title,
//     path: '/products'
//   });
// })
// .catch(err=>console.log(err));
// };


exports.getIndex = (req, res, next) => {
  Product.findAll()
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
  .then(cart=>{
    console.log(cart)
   return cart
   .getProducts()
   .then(products=>{
    console.log(products);
    res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
   .catch(err=>console.log(err));
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
  let fetchedCart;
  let newQuantity=1;
  req.user
  .getCart()
  .then(cart=>{
     fetchedCart=cart;
    return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
    let product;
    if(products.length>0)
    {
      product=products[0];
    }
    
    if(product)
    {
      let oldQuantity=product.cartitem.quantity;
      newQuantity=oldQuantity+1;
      return product;
      
    }
    return Product.findByPk(prodId)
  })
    .then(product=>{
      console.log(product)
      return fetchedCart.addProduct(product,{
        
        through:{quantity:newQuantity}
      })
    })
    .catch(err=>console.log(err))

    .then(()=>{
      res.redirect('/cart')
  })
    .catch(err=>console.log(err))

}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId=req.body.productId;
  req.user
  .getCart()
  .then(cart=>{
     
     return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
   const product=products[0]
    return product.cartitem.destroy();
  })
  .then(result=>{
    res.redirect('/cart');
  })
  .catch(err=>console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
