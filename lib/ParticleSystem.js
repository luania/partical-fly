"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
var Particle_1 = require("./script/Particle");
var ContainerFactory_1 = require("./ContainerFactory");
var ParticleSystem = (function () {
    function ParticleSystem(stage, originPosition, config) {
        this.particles = [];
        this.originPosition = new PVector_1.PVector(0, 0);
        this.stage = stage;
        this.originPosition = originPosition;
        this.config = config;
        this.factory = new ContainerFactory_1.ContainerFactory(config);
    }
    ParticleSystem.prototype.emit = function (multiple) {
        this.emitAtPosition(multiple, this.originPosition.x, this.originPosition.y);
    };
    ParticleSystem.prototype.emitAtPosition = function (multiple, x, y) {
        var countMultiple = multiple ? this.config.clickCountMultiple : 1;
        this.factory.multiple = multiple;
        for (var i = 0; i < this.config.emitEveryTime * countMultiple; i++) {
            var container = this.factory.create();
            container.position.set(x, y);
            if (this.config.randomInitialAngle) {
                container.rotation = Math.random() * Math.PI * 2;
            }
            this.stage.addChild(container);
            var p = new Particle_1.Particle(container);
            p.rotation = this.config.rotation;
            p.position = new PVector_1.PVector(x, y);
            p.velocity = new PVector_1.PVector((Math.random() - 0.5) * this.config.maxInitialVelocity.x, (Math.random() - 0.5) * this.config.maxInitialVelocity.y);
            p.rateOfAging = this.config.rateOfAging;
            p.mass = 1 + Math.random() * 3;
            this.particles.push(p);
        }
    };
    ParticleSystem.prototype.run = function () {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.update();
            if (p.isDead()) {
                this.stage.removeChild(p.container);
                p.container.destroy();
                this.particles.splice(this.particles.indexOf(p), 1);
            }
        }
    };
    ParticleSystem.prototype.applyForce = function (force) {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.applyForce(force);
        }
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
