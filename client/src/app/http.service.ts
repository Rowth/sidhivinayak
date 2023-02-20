
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: "root"
})

export class HttpService {

    toggle$: Observable<any>;

    private toggleSource = new Subject<boolean>();
    profileData: any;
    searchArray = [];
    catdata: any
    playLiatId = 'AIzaSyCa2XE1M1w-2-FgA354m1BuH9LBt_d9gPk';
    dataStore = new BehaviorSubject<any>([]);
    searchStore = new BehaviorSubject<any>([]);
    searchValue = new BehaviorSubject<any>([]);
    ArrayData = new BehaviorSubject<any>([]);
    catIdAndData = new BehaviorSubject<any>([]);
    contactdata = new BehaviorSubject<any>([]);
    timeDataArray = new ReplaySubject<any>(5);
    paramsObject: any;
    userToken: any;

    getBaseUrl() {
        // if (environment.production) {
        return 'https://sidhivinayaktimes.com/api'
        // } else {
        // return 'http://localhost:9000/api'
        // }
    }


    constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
        this.toggle$ = this.toggleSource.asObservable();
        if (isPlatformBrowser(this.platformId)) {
            this.getToken();
        }
    }

    getToken() {
        let token = JSON.parse(sessionStorage.getItem('userInfo'))?.userToken
        if (token) {
            this.userToken = new HttpHeaders().append('Authentication', token)
        }
    }

    addData(url: any, data: any): Observable<any> {
        try {
            return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data, { 'headers': this.userToken })
        }
        catch (error) {
            return error;
        }
    };

    logIn(url: any, data: any): Observable<any> {
        try {
            return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data)
        }
        catch (error) {
            return error;
        }
    };

    updateData(url: any, data: any): Observable<any> {
        try {
            return this.httpClient.put(`${this.getBaseUrl()}/${url}`, data, { 'headers': this.userToken })
        }
        catch (error) {
            return error;
        }
    };

    Register(url: any, data: any): Observable<any> {
        try {
            return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data, { 'headers': this.userToken })
        }
        catch (error) {
            return error;
        }
    }
    getData(url: any): Observable<any> {
        try {
            return this.httpClient.get(`${this.getBaseUrl()}/${url}`)
        }
        catch (error) {
            return error;
        }
    }
    deleteData(url: any, id: any): Observable<any> {
        try {
            return this.httpClient.delete(`${this.getBaseUrl()}/${url}/${id}`, { 'headers': this.userToken });
        }
        catch (error) {
            return error;
        }
    }

    addSubCategory(url: any, data: any): Observable<any> {
        try {
            return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data, { 'headers': this.userToken });
        }
        catch (error) {
            return error;
        }
    }
    forgetPswd(url: any, data: any): Observable<any> {
        try {
            return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data);
        }
        catch (error) {
            return error;
        }
    };


    getSubCategory(url: any, id: any): Observable<any> {
        try {
            return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${id}`);
        }
        catch (error) {
            return error;
        }
    }
    getSubCategorybyName(url: any, catName: any, status: any): Observable<any> {
        try {
            return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${catName}&type=${status}`);
        }
        catch (error) {
            return error;
        }
    }
    getLimitValue(url: any, id: any, limitValue: any, pageSize: any): Observable<any> {
        try {
            return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${id}&limit=${limitValue}&page=${pageSize}`);
        }
        catch (error) {
            return error;
        }
    }
    addNews(url: any, data): Observable<any> {
        try {
            return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data, { 'headers': this.userToken });
        }
        catch (error) {
            return error
        }
    }
    categoryGet(url: any, id: any, name: any, limit: any, page: any) {
        try {
            return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${id}&name=${name}&limit=${limit}&page=${page}`);
        }
        catch (error) {
            return error;
        }
    }
    searchData(data: any) {
        this.searchArray = data;
    }

    getLimitData(url: any, limit: any, page: any) {
        try {
            return this.httpClient.get(`${this.getBaseUrl()}/${url}/${limit}/${page}`)
        }
        catch (error) {
            return error;
        }
    }


    youtubeVide(page: any) {
        try {
            return this.httpClient.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCfm4k1CW0AcNzeBln0nTrjg&maxResults=${page}&order=date&key=${this.playLiatId} `);
        }
        catch (error) {
            return error
        }
    }
    goToTop() { if (isPlatformBrowser(this.platformId)) { window.scrollTo(0, 0) } }
    toggleNavbar(value) {
        this.toggleSource.next(value);
    }
    adsScriptFun() {
        let script = document.createElement('script');
        script.async = true
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3013303145491550";
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script)
    }

}
