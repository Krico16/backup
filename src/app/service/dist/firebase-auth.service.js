"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirebaseAuthService = void 0;
var core_1 = require("@angular/core");
var auth = require("firebase/app");
var FirebaseAuthService = /** @class */ (function () {
    function FirebaseAuthService(fireAuth, firestore, router) {
        var _this = this;
        this.fireAuth = fireAuth;
        this.firestore = firestore;
        this.router = router;
        this.fireAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userData = user;
                localStorage.setItem('user', JSON.stringify(_this.userData));
            }
            else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }
    FirebaseAuthService.prototype.SignIn = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    FirebaseAuthService.prototype.SignInAnon = function () {
        return this.fireAuth.signInAnonymously();
    };
    FirebaseAuthService.prototype.Register = function (email, password) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password);
    };
    FirebaseAuthService.prototype.GoogleAuth = function () {
        return this.ExternalLogin(new auth["default"].auth.GoogleAuthProvider());
    };
    FirebaseAuthService.prototype.logOut = function () {
        var _this = this;
        return this.fireAuth.signOut().then(function () {
            localStorage.removeItem('user');
            _this.router.navigate(['home']);
        });
    };
    Object.defineProperty(FirebaseAuthService.prototype, "isLogged", {
        get: function () {
            var user = JSON.parse(localStorage.getItem('user'));
            return user !== null ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    FirebaseAuthService.prototype.ExternalLogin = function (provider) {
        var _this = this;
        return this.fireAuth
            .signInWithPopup(provider)
            .then(function (result) {
            _this.router.navigate(['menu/list']);
            _this.setUserData(result.user);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    FirebaseAuthService.prototype.setUserData = function (user) {
        var userRef = this.firestore.doc("users/" + user.uid);
        var userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        return userRef.set(userData, { merge: true });
    };
    FirebaseAuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FirebaseAuthService);
    return FirebaseAuthService;
}());
exports.FirebaseAuthService = FirebaseAuthService;
