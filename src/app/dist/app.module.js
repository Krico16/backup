"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var firebase_auth_service_1 = require("./service/firebase-auth.service");
var environment_1 = require("./../environments/environment");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var fire_1 = require("@angular/fire");
var auth_1 = require("@angular/fire/auth");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            entryComponents: [],
            imports: [
                platform_browser_1.BrowserModule,
                angular_1.IonicModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                auth_1.AngularFireAuthModule,
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule,
            ],
            providers: [
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy },
                firestore_1.AngularFirestoreModule,
                firebase_auth_service_1.FirebaseAuthService,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
