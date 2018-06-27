import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    SectionList,
    TouchableOpacity,
    Image
} from 'react-native';

import {inject,observer} from 'mobx-react'
import ParcelData from './ParcelData'
import Column from "../../view/Column";
import Row from "../../view/Row";
import {marginTB, px2dp, screenW, wh,px2sp,marginLR} from "../../utils/ScreenUtil";
import Divider from "../../view/Divider";
import {Button} from 'teaset'
import Color from "../../app/Color";
import Text from '../../view/TextView'
import VisibleView from "../../view/VisibleView";
import CartAnimated from "../../view/CartAnimated";
import ShopBar from "../../view/ShopBar";


let Headers = [];
@inject(['cartStore'])

@observer

export default class ShopInfoList extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
             selectIndex:0,//左边列表选中的位置
        };
        this.startPosition = {x:200,y:200};//开始的坐标
        this.endPosition = null;//结束的坐标
      }

    componentDidMount() {
        ParcelData.map((item,i) =>{
            Headers.push(item.section)//取出数据里面每组
        });
    }

    render() {
        return (
             <Column style={styles.container}>
                 <Row style={{flex:1}}>
                     <FlatList
                      ref={(flat)=>this.flat = flat}
                      style={{width:1 * screenW}}
                      data={ParcelData}
                      renderItem={(item) => this.renderLRow(item)}
                      ItemSeparatorComponent={()=><Divider/>}
                      keyExtractor={(item) =>item.section}
                     />
                     <SectionList
                       ref={(section) => this.section = section}
                       style={{width:3*screenW}}
                       stickySectionHeadersEnabled={true}//头部悬乎
                       renderSectionHeader={(section) => this._sectionComp(section)}
                       renderItem={(item) => this.renderRRow(item)}
                       sections={ParcelData}
                       keyExtractor={(item) => item.name}
                       ItemSeparatorComponent={() => <Divider/>}
                       onViewableItemsChanged={(info) =>this.itemChange(info)}
                     />
                 </Row>
                 <CartAnimated ref={'cart'}/>
                 <ShopBar
                     ref={(s) =>this.shopBar = s}
                     cartElement={(c) => this.cartElement = c}
                     store={this.props.cartStore}
                     navigation={this.props.navigation}
                 />
             </Column>
        );
    }
    //左边每组item
    renderLRow=(item)=>{

          return(
              <Button
                  style={[styles.litem,{
                      borderBottomColor:item.index + 1 === ParcelData.length ? Color.divider:'transparent',
                      borderBottomWidth:item.index + 1 === ParcelData.length ? px2dp(1):0
                  }]}
                  title={item.item.section}
                  titleStyle={{fontSize:px2dp(26),color:item.index === this.state.selectIndex ? Color.theme : Color.black}}
                  onPress={()=>this._callAction(item)}
                />
          )
    }
    //右边每组的头部
    _sectionComp=(section)=>{
        return(
            <View style={{height:30,backgroundColor:'#DEDEDE',justifyContent:'center',alignItems:'center'}}>
                <Text>{section.section.section}</Text>
            </View>
        )
    }
    //右边每组的item
    renderRRow=(item)=>{

        return(
            <View style={styles.rItem}>
                <Row style={{flex:1}}>
                    <Image source={{uri:item.item.img}} style={styles.iconStyle}/>
                    <Column style={{flex:1, marginVertical:10,marginLeft:10,justifyContent:'space-between'}}>
                    <Text mediumSize text={item.item.name} style={{fontWeight:'600'}}/>
                        <Row verticalCenter>
                            <Text microSize text={item.item.sale}/>
                            <Text microSize text={item.item.favorite} style={{marginLeft:15}}/>
                        </Row>
                        <Text microSize orange text={`￥${item.item.money}`}/>
                    </Column>
                    {/*加减view*/}
                    <Row verticalCenter style={{position:'absolute',right:px2dp(20),bottom:px2dp(20)}}>
                        <VisibleView visible={this.props.cartStore.getFoodBuyNum(item.item) > 0}>
                            <Row verticalCenter>
                                <TouchableOpacity style={[styles.itemActionStyle,styles.litemActionBg]} onPress={() => this._sub(item)}>
                                <Text largeSize theme text={'-'}/>
                                </TouchableOpacity>
                                {/*当前加入购物车的数量*/}
                                <Text text={this.props.cartStore.getFoodBuyNum(item.item)} style={{...marginLR(20)}}/>
                            </Row>
                        </VisibleView>

                        <TouchableOpacity ref={(t) =>this.addAction = t} style={[styles.itemActionStyle,styles.ritemActionBg]}
                                          onPress={()=>this._add(item)}>

                            <Text largeSize white text={'+'}/>
                        </TouchableOpacity>
                    </Row>
                 </Row>
            </View>
        )
    }

    //点击左边每组的item
    _callAction=(item) =>{
        if (item.index <= ParcelData.length) {
           this.setState({selectIndex: item.index});
            this.section.scrollToLocation({animated:false,itemIndex:item.index})
        }
    }
    //
    itemChange=(info)=>{
       let section = info.viewableItems[0].item.section;
       console.log(section)
        if (section){
           let index = Headers.indexOf(section);
            console.log(index)
           if (index < 0){
               index = 0;
           }
           console.log(`AAAAAA${index}`);
           this.setState({selectIndex:index})
        }

    }

    //点击+号
    _add=(data)=>{
      this.props.cartStore.addFood(data.item)

       this.cartElement.measure((x,y, width,height,px,py)=>{
           this.endPosition = {x:px,y:py};
           this.refs.cart.startAnim(this.startPosition,this.endPosition,this._doAnim)
       })
    }
    //
    _doAnim=()=>{
          this.shopBar.runAnimate()
    }

    //-减号
    _sub = (data) => {
        this.props.cartStore.subFood(data.item)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    litem:{
       minHeight:px2dp(80),
       justifyContent:'center',
       backgroundColor:Color.white,
        borderColor:Color.white,
        borderRadius:0
    },
    rItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.white
    },
    iconStyle:{
        ...wh(100),
        ...marginTB(15),
        marginLeft:px2dp(15),
        borderWidth:1,
        borderColor:'#999999'

    },
    itemActionStyle:{
        ...wh(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ritemActionBg:{
        borderRadius: px2dp(20),
        backgroundColor: Color.theme
    },
    litemActionBg:{
        borderRadius: px2dp(20),
        borderWidth: px2dp(1),
        borderColor: Color.theme,
        backgroundColor: Color.white
    }
});
