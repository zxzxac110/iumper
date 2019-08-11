var uid=sessionStorage.getItem("uid")
myajax({
    url:"http://127.0.0.1:5050/shoppingcart/v1",
    type:"get",
    data:"uid="+uid,
    dataType:"json"
}).then(
    function(result){
    //发送AJAX
    function seart(resu){
    var html="";
    for(var elem of resu){
        html+=`<tr data-cid="${elem.cid}">
        <td><input type="checkbox"></td>
                <td>
                    <span>
                        <a href="product_details.html?lid=${elem.pid}">
                                <img src=${elem.img} alt=""> 
                        </a>
                    </span>
                    <span>
                        <a href="product_details.html?lid=${elem.pid}">${elem.title}</a>
                    </span>
                </td>
                <td>${elem.edtiton}</td>
                <td>
                    <p>￥${(elem.price).toFixed(2)}</p>
                    <p>
                        <s>￥${(elem.price).toFixed(2)}</s> 
                    </p>
                </td>
                <td>
                    <div>
                        <img data-taggle="sub" src="Public/images/jj1.png" >
                    </div>
                    <input type="text" value=${elem.count}>
                    <div>
                        <img data-taggle="add" src="Public/images/jj0S.png" class="imgadd">
                    </div>
                </td>
                <td>￥${(elem.price*elem.count).toFixed(2)}</td>
                <td> 
                    <a data-taggle="del">删除</a>  
                    <span>/</span> 
                    <a data-taggle="collect">加入我的收藏</a>
                </td></tr>    `
    }
    document.querySelector("#shoppingcart-table tbody").innerHTML=html
    }
    seart(result);
    //表单
   var table=document.querySelector(".shoppingcart-table")
   var tbody=table.children[1]
    //总价  /商品数量
   var total=document.getElementById("total");
   var sum=document.getElementById("sum");    
    //全选框 /每件商品勾选框 
   var cnball=document.querySelector(".shoppingcart-tfoot>td>input");
//函数改变小计.总数量.总价显示
    function  cartNum(){
        var i=0,totalprice=0
        for(var cnb of tbody.children){
            var price=cnb.children[3].firstElementChild;//单价
            price=parseInt(price.innerHTML.slice(1))
            var number=cnb.children[4].children[1].value//当前商品数量
            var subtotal=cnb.children[5]                //小计
            var a=`￥${(price*number).toFixed(2)}`
            subtotal.innerHTML=a
            if(cnb.firstElementChild.firstElementChild.checked==true){          //选项框
                i++;  
                totalprice+=price*number
            }
        }
        sum.innerHTML=i;
        total.innerHTML=`￥${totalprice.toFixed(2)}`
    }
    cartNum()   
//点击全选按钮
cnball.onclick=function(){
    var cnbs=document.querySelectorAll(".shoppingcart-table>tbody>tr>td>input:first-child"); 
        for(var cnb of cnbs){
            cnb.checked=cnball.checked;                       //状态赋值
        }
        cartNum() 
    }      
//点击删除选中了的商品
var selectDelede=cnball.parentNode.nextElementSibling;
selectDelede.onclick=function(){
    if(confirm("确定要删除选中的记录吗？一旦删除将不能恢复！")){
        var i=0,cid=[]
        var cnbs=document.querySelectorAll(".shoppingcart-table>tbody>tr>td>input:first-child"); 
        for (var cnb of cnbs){
            if(cnb.checked==true){  
                //此行tr            
                 var tr=cnb.parentNode.parentNode;
                 //删除此行tr
                 table.deleteRow(tr.rowIndex); 
                 i++;
                cid.push(tr.dataset.cid) 
                }
            }
        if(i===0){
            alert("未选中任意商品")
        }else{
            alert(`已删除${i}件商品`)
             myajax({
            url:"http://127.0.0.1:5050/shoppingcart/v1",
            type:"get",
            data:"uid="+uid+"&cid="+cid,
            dataType:"json"
            }).then(function(result){
                //调用加载DOM树函数
                seart(result)
                //调用加载头部信息函数
                headerajax()
                })
        }
        cartNum()   
    }  
}                  
//事件绑定tbody文本框内容改变
tbody.onchange=function(e){
var ope=e.target
if(ope.nodeName=="INPUT"&&ope.type==="text"){
    if(ope.value.search(/^[1-9][0-9]?$/i)==-1){
        ope.value="1"
    }
    cartNum()  
}
}
//事件绑定点击tbody    
tbody.onclick=function(e){
var ope=e.target
//如果是选项框
if(ope.nodeName=="INPUT"&&ope.type==="checkbox"){
    if(ope.checked==false){
        cnball.checked=false;
        }else{
        //每次都寻找一下当前有没有 未选中的选择框
        var uncnb=document.querySelector(".shoppingcart-table>tbody>tr>td:first-child>input:not(:checked)"); 
        //当找不到时，全选
            if(uncnb===null){
            cnball.checked=true;
        }
    }
    cartNum()
}
//如果是加减按钮
if(ope.dataset.taggle==="sub"){
    var wsum=ope.parentNode.nextElementSibling
    if(wsum.value>1){
    wsum.value--
    cartNum()
    }
}
if(ope.dataset.taggle==="add"){
    var wsum=ope.parentNode.previousElementSibling
    if(wsum.value<99){
    wsum.value++
    cartNum()
    }
}
//删除选项
if(ope.dataset.taggle==="del"){
     if(confirm("确定要删除选中的记录吗？一旦删除将不能恢复！")){
         var cid=ope.parentNode.parentNode.dataset.cid
         myajax({
            url:"http://127.0.0.1:5050/shoppingcart/v1",
            type:"get",
            data:"uid="+uid+"&cid="+cid,
            dataType:"json"
            }).then( function(result){
                //调用加载DOM树函数
                seart(result)
                //调用加载头部信息函数
                headerajax()
            }
            )
            //调用数据变化函数
         cartNum()
        }
    }
//收藏选项
if(ope.dataset.taggle==="collect"){
    alert("收藏成功")}
}
})