const mongoose = require('mongoose');
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
    res.render('index', {
        title: 'Homepage'
    });
}

exports.addStore= (req, res) => {
    res.render('editStore', {
        title: 'Add Store'
    })
}

exports.createStore= async (req, res) => {
    const store = await (new Store(req.body)).save();
    await store.save()
    req.flash('info', `Store ${store.name} created`)
    res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
    // query db for list of stores
    const stores = await Store.find();
    res.render('stores',  { title: 'Stores', stores });
}

exports.editStore = async (req, res) => {
    const store = await Store.findOne({ _id: req.params.id });
    res.render('editStore', { title: `Edit ${store.name}`, store });
}

exports.updateStore = async (req, res) => {
    const store = await Store.findOneAndUpdate({
        _id: req.params.id
    }, req.body,  {
        new: true,
        runValidators: true
    }).exec();
    req.flash('success', `Succesfully updated ${store.name} <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/store/${store.slug}`)
}