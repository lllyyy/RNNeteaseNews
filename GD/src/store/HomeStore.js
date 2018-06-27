import {action, computed, observable} from "mobx";

/**
 * @observable: 使用此标签监控要检测的数据；
 @observer: 使用此标签监控当数据变化是要更新的Component（组件类）
 @action:使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)
 */
 class HomeStore{

    @observable location = ''; //定位
    @observable categoryList = []; //分类数组
    @observable shopList = []; //店铺列表

    @action
    setLocation(info){
        this.location = info
    }

    @computed
    get getLocation(){
        return this.location
    }

    @action
    categoryAddAll(list){
        this.categoryList = list
    }

    @computed
    get getCategoryList(){
        return this.categoryList
    }

    @action
    shopAddAll(list){
        this.shopList = list
    }

    @computed
    get getShopList(){
        return this.shopList
    }

}
const homeStore = new HomeStore();
export default homeStore
