"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirebaseService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(firestore) {
        this.firestore = firestore;
        this.collectionName = 'commerces';
        this.commerceCollection = this.firestore.collection('commerce');
        this.commerce = this.commerceCollection.snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    }
    FirebaseService.prototype.getCommerces = function () {
        return this.commerce;
    };
    FirebaseService.prototype.getCommerceId = function (id) {
        return this.commerceCollection
            .doc(id)
            .valueChanges()
            .pipe(operators_1.take(1), operators_1.map(function (res) {
            res.id = id;
            return res;
        }));
    };
    FirebaseService.prototype.createCommerce = function (data) {
        return this.commerceCollection.add(data);
    };
    FirebaseService.prototype.updateCommerce = function (data) {
        return this.commerceCollection.doc(data.id).update({
            Name: data.Name,
            Contact: data.Contact,
            Direction: data.Direction,
            SocialLinks: data.SocialLinks,
            ImageUrl: data.ImageUrl
        });
    };
    FirebaseService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
