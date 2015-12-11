import {Component, ViewEncapsulation} from 'angular2/angular2';


@Component({
  selector: 'disqus',
  templateUrl: './components/blog/components/disqus/disqus.html',
  styleUrls: ['./components/blog/components/disqus/disqus.css'],
  encapsulation: ViewEncapsulation.None,
  properties: ['post']
})
export class DisqusCmp {
  private _reset: boolean = false;
  private _post: any;
  set post(val) {
    this._post = val;
  }
  ngAfterViewChecked() {
    this._resetDiscus();
  }
  private _resetDiscus(): void {
    if (this._reset) { return; }
    let _self = this;
    (<any>window).DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = _self._post.id;
            this.page.url = _self._post.link;
            this.page.title = _self._post.slug;
            this.language = 'en';
        }
    });
    this._reset = true;
  }
}