import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-alertnotification',
    templateUrl: './alertnotification.component.html',
    styleUrls: ['./alertnotification.component.css']
})


export class AlertnotificationComponent implements OnInit {

    constructor() {

    }

    public _type: string;
    @Input()
    set type(type: string) {
        this._type = type;
    }
    get type(): string {
        return this._type;
    }

    public _header: string;
    @Input()
    set header(header: string) {
        this._header = header;
    }
    get header(): string {
        return this._header;
    }

    public _message: string;
    @Input()
    set message(message: string) {
        this._message = message;
    }
    get message(): string {
        return this._message;
    }

    public _isAllowTimeOut: boolean;
    @Input()
    set isAllowTimeOut(isAllowTimeOut: boolean) {
        this._isAllowTimeOut = isAllowTimeOut;
    }
    get isAllowTimeOut(): boolean {
        return this._isAllowTimeOut;
    }

    public _timeOut: number;
    @Input()
    set timeOut(timeOut: number) {
        this._timeOut = timeOut;
    }
    get timeOut(): number {
        return this._timeOut;
    }

    setSuccessMessage(message: string) {
        $("#notificationalert").addClass("show");
        this._message = message;
        console.log("setSuccessMessage", this._message);
    }
    setErrorMessage(message: string) {
        this._type = "danger";
        $("#notificationalert").addClass("show");
        this._message = message;
        console.log("setErrorMessage", this._message);
    }
    show() {
        $("#notificationalert").addClass("show");
    }

    ngOnInit() {
        this.playAudio();
        if (this._isAllowTimeOut) {
            setTimeout(() => $("#notificationalert").alert('close'), this._timeOut);
        }
    }

    playAudio() {
        //let audio = new Audio();
        //audio.src = "../../../assets/sound/notification.mp3";
        //audio.load();
        //audio.play();
    }
}
