import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../../BaseScreen";
import Divider from '../../../view/Divider'
import EmptyView from '../../../view/EmptyView'
import Column from "../../../view/Column";
import Row from "../../../view/Row";
import {marginLR, marginTB, paddingTB, px2dp, wh} from "../../../utils/ScreenUtil";
import Input from "../../../view/Input";
import Color from "../../../app/Color";
import {Button,Toast} from 'teaset'
import Text from '../../../view/TextView'

import AddressApi from "../../../api/AddressApi";

export default class SearchAddressScreen extends BaseScreen {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.setTitle('搜索地址')
       this.state = {
           adders:[],
       };
       this.keyWord='';
      }
      //搜索结果
    selectWord=()=>{
        if (this.keyWord === '') {
            Toast.message('请输入搜索内容');
            return;
        }
      AddressApi.fetchSearchNearby(this.keyWord).then((res) =>{
          this.setState({adders:res})
      })
    }

    //点击每一个item
    clickItem(item){
         const navigation = this.props.navigation;
         navigation.state.params.callback(item)
         navigation.goBack()
    }

    renderView() {
        return (
             <FlatList
                 data={this.state.adders}
                 renderItem={this._renderItem}
                 keyExtractor={(item, index) => index + ''}
                 ListHeaderComponent={this._renderHeader}
                 ListEmptyComponent={() =><EmptyView style={{marginTop:px2dp(30)}}/>}
                 ItemSeparatorComponent={() => <Divider/>}
             />
        );
    }

    _renderItem=({item,index})=>{
        return(
            <TouchableOpacity onPress={this.clickItem.bind(this,item)} activeOpacity={0.5}>
            <Column style={styles.itemStyle}>
                <Text gray text={item.name}/>
                <Text gray text={item.address}/>
            </Column>
            </TouchableOpacity>
        )
    }

    _renderHeader=()=>{
          return(
              <Column>
                   <Row verticalCenter style={{padding: px2dp(15),backgroundColor:Color.white}}>
                       <Input
                           bgViewStyle={styles.inputStyle}
                           placeholder={'请输入小区/写字楼/学校等'}
                           value={this.keyWord}
                           onChangeText={(text) => this.keyWord = text}
                       />
                       <Button
                           title={'搜索'}
                           style={styles.btnStyle}
                           titleStyle={{color:Color.white}}
                           onPress={this.selectWord}
                        />
                   </Row>
                  <Row horizontalCenter verticalCenter style={{...paddingTB(15),backgroundColor: '#fce6c9'}}>
                      <Text mediumSize text={'为了满足商家的送餐要求，建议您从列表中选择地址'} style={{color: '#faa460'}}/>
                  </Row>
                </Column>

      )
     }
}

const styles = StyleSheet.create({
    inputStyle:{
        height: px2dp(70),

        backgroundColor: Color.gray,
        borderRadius: px2dp(2),
        padding: px2dp(5)
    },
    btnStyle:{
        ...wh(120,70),
        borderWidth:0,
        marginLeft:px2dp(10),
        backgroundColor:Color.theme
    },
    itemStyle: {
        padding: px2dp(15),
        justifyContent: 'space-between'
    }
});
