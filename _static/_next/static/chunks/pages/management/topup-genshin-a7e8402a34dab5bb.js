(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2591],{24410:function(n,e,r){"use strict";var t=r(64836);e.Z=void 0;var i=t(r(64938)),a=r(85893),o=(0,i.default)((0,a.jsx)("path",{d:"M17.41 6.59 15 5.5l2.41-1.09L18.5 2l1.09 2.41L22 5.5l-2.41 1.09L18.5 9l-1.09-2.41zm3.87 6.13L20.5 11l-.78 1.72-1.72.78 1.72.78.78 1.72.78-1.72L23 13.5l-1.72-.78zm-5.04 1.65 1.94 1.47-2.5 4.33-2.24-.94c-.2.13-.42.26-.64.37l-.3 2.4h-5l-.3-2.41c-.22-.11-.43-.23-.64-.37l-2.24.94-2.5-4.33 1.94-1.47c-.01-.11-.01-.24-.01-.36s0-.25.01-.37l-1.94-1.47 2.5-4.33 2.24.94c.2-.13.42-.26.64-.37L7.5 6h5l.3 2.41c.22.11.43.23.64.37l2.24-.94 2.5 4.33-1.94 1.47c.01.12.01.24.01.37s0 .24-.01.36zM13 14c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"}),"SettingsSuggest");e.Z=o},83543:function(n,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/management/topup-genshin",function(){return r(61528)}])},93484:function(n,e,r){"use strict";r.d(e,{$P:function(){return i},Np:function(){return c},Y1:function(){return a},aD:function(){return o}});var t=r(77907),i=function(n){return t.Z.post("/deposit/create",n)},a=function(){return t.Z.get("/deposit?limit=9999")},o=function(n,e){return t.Z.patch("/deposit/update-status-transaction/".concat(n),{transaction_status:e})},c=function(){return t.Z.get("/history/latest-top-up")}},61528:function(n,e,r){"use strict";r.r(e),r.d(e,{default:function(){return en}});var t=r(85893),i=r(37652),a=r(60853),o=r(86886),c=r(15861);var s=function(){var n=(0,a.a)().user;return(0,t.jsx)(o.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",children:(0,t.jsxs)(o.ZP,{item:!0,children:[(0,t.jsx)(c.Z,{variant:"h3",component:"h3",gutterBottom:!0,children:"Qu\u1ea3n l\xfd n\u1ea1p game Genshin"}),(0,t.jsxs)(c.Z,{variant:"subtitle2",children:["H\xfa ",null===n||void 0===n?void 0:n.username,", qu\u1ea3n l\xfd y\xeau c\u1ea7u n\u1ea1p \u1edf \u0111\xe2y nh\xe9~!"]})]})})},l=r(47568),u=r(20414),d=r(66242),h=r(93484),p=r(67294),g=r(26042),x=r(69396),f=r(2058),Z=r(2734),m=r(78445),j=r(87357),v=r(94054),y=r(47312),b=r(153),S=r(30431),k=r(67720),w=r(72882),C=r(7906),P=r(53184),R=r(68509),_=r(98102),E=r(295),N=r(21023),O=r(93946),W=r(47171),T=r(32912),D=r(45697),L=r.n(D),I=r(29268),M=r(82601),z=r(33829),B=r(76891),U=r(24410),G=r(11057),q=r(74231),A=q.Ry({status:q.Z_().required("Tr\u1ea1ng th\xe1i kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng")});var F=function(n){var e=n.title,r=n.id,i=(0,a.a)(),o=i.handleSetMessage,c=i.updateSuccess,s=(0,p.useState)(!1),d=s[0],g=s[1],x=function(){g(!1)},f=function(){var n=(0,l.Z)((function(n,e){var t,i;return(0,u.__generator)(this,(function(a){switch(a.label){case 0:t=e.resetForm,i=n.status,a.label=1;case 1:return a.trys.push([1,3,,4]),[4,(0,h.aD)(r,i).then((function(){o({type:"success",message:"Thay \u0111\u1ed5i tr\u1ea1ng th\xe1i th\xe0nh c\xf4ng"}),x(),t(),c()}))];case 2:return a.sent(),[3,4];case 3:return a.sent(),o({type:"error",message:"C\xf3 l\u1ed7i x\u1ea3y ra, vui l\xf2ng ki\u1ec3m tra l\u1ea1i th\xf4ng tin nh\u1eadp"}),[3,4];case 4:return[2]}}))}));return function(e,r){return n.apply(this,arguments)}}(),Z=(0,M.Z)(A,{status:"SUCCESS"},f);return(0,t.jsx)(I.Z,{icon:(0,t.jsx)(U.Z,{}),title:e,openDialog:d,handleOpenDialog:function(){g(!0)},handleCloseDialog:x,children:(0,t.jsxs)(z.Z,{formik:Z,children:[(0,t.jsx)(B.Z,{formik:Z,label:"Thay \u0111\u1ed5i tr\u1ea1ng th\xe1i",variant:"outlined",fullWidth:!0,name:"status",sx:{my:2},options:[{value:"SUCCESS",title:"Ho\xe0n th\xe0nh"},{value:"ERROR",title:"L\u1ed7i"}]}),(0,t.jsx)(G.Z,{variant:"contained",fullWidth:!0,type:"submit",children:Z.isSubmitting?"Loading...":"\u0110\u1ed5i tr\u1ea1ng th\xe1i"})]})})},H=function(n){var e={PENDING:{text:"PENDING",color:"error"},SUCCESS:{text:"SUCCESS",color:"success"},ERROR:{text:"ERROR",color:"error"}}[n],r=e.text,i=e.color;return(0,t.jsx)(f.Z,{color:i,children:r})},Q=function(n){var e=n.cryptoOrders,r=(0,p.useState)(0),i=r[0],a=r[1],o=(0,p.useState)(10),s=o[0],l=o[1],u=(0,p.useState)({role:null}),h=u[0],f=u[1],D=function(n,e){return n.filter((function(n){var r=!0;return e.role&&n.status!==e.role&&(r=!1),r}))}(e,h),L=function(n,e,r){return n.slice(e*r,e*r+r)}(D,i,s),I=(0,Z.Z)();return(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(m.Z,{action:(0,t.jsx)(j.Z,{width:150,children:(0,t.jsxs)(v.Z,{fullWidth:!0,variant:"outlined",children:[(0,t.jsx)(y.Z,{children:"Status"}),(0,t.jsxs)(b.Z,{value:h.role||"all",onChange:function(n){var e=null;"all"!==n.target.value&&(e=n.target.value),f((function(n){return(0,x.Z)((0,g.Z)({},n),{role:e})}))},label:"Status",autoWidth:!0,children:[(0,t.jsx)(S.Z,{value:"all",children:"All"}),(0,t.jsx)(S.Z,{value:"PENDING",children:"PENDING"}),(0,t.jsx)(S.Z,{value:"SUCCESS",children:"SUCCESS"}),(0,t.jsx)(S.Z,{value:"ERROR",children:"ERROR"})]})]})}),title:"Recent Orders"}),(0,t.jsx)(k.Z,{}),(0,t.jsx)(w.Z,{children:(0,t.jsxs)(C.Z,{children:[(0,t.jsx)(P.Z,{children:(0,t.jsxs)(R.Z,{children:[(0,t.jsx)(_.Z,{width:"30%",children:"G\xf3i n\u1ea1p"}),(0,t.jsx)(_.Z,{children:"Th\xf4ng tin"}),(0,t.jsx)(_.Z,{align:"right",children:"Ng\xe0y mua"}),(0,t.jsx)(_.Z,{align:"right",children:"Tr\u1ea1ng th\xe1i"}),(0,t.jsx)(_.Z,{align:"right",children:"Actions"})]})}),(0,t.jsx)(E.Z,{children:L.map((function(n){return(0,t.jsxs)(R.Z,{hover:!0,children:[(0,t.jsx)(_.Z,{children:(0,t.jsx)(c.Z,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:n.pack})}),(0,t.jsxs)(_.Z,{children:[(0,t.jsxs)(c.Z,{variant:"body1",color:"text.primary",gutterBottom:!0,noWrap:!0,children:[(0,t.jsx)("b",{children:"Username: "})," ",n.username," |"," ",(0,t.jsx)("b",{children:"Password: "}),n.password]}),(0,t.jsxs)(c.Z,{variant:"body1",color:"text.primary",gutterBottom:!0,noWrap:!0,children:[(0,t.jsx)("b",{children:"Social: "})," ",n.phone," | ",(0,t.jsx)("b",{children:"Ingame: "}),n.name]}),(0,t.jsxs)(c.Z,{variant:"body1",color:"text.primary",gutterBottom:!0,noWrap:!0,children:[(0,t.jsx)("b",{children:"Server: "})," ",n.server," |"," ",n.note&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("b",{children:"Note"}),n.note]})]})]}),(0,t.jsxs)(_.Z,{align:"right",children:[(0,t.jsx)(c.Z,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:(0,T.Z)(new Date(n.created_at),"dd/MM/yyyy")}),(0,t.jsx)(c.Z,{children:(0,T.Z)(new Date(n.created_at),"hh:mm:ss")})]}),(0,t.jsx)(_.Z,{align:"right",children:H(n.status)}),(0,t.jsx)(_.Z,{align:"right",children:(0,t.jsx)(N.Z,{title:"\u0110\u1ed5i tr\u1ea1ng th\xe1i",arrow:!0,children:(0,t.jsx)(O.Z,{sx:{"&:hover":{background:I.colors.success.lighter},color:I.palette.success.main},color:"success",size:"small",children:(0,t.jsx)(F,{title:"\u0110\u1ed5i tr\u1ea1ng th\xe1i",id:n.id})})})})]},n.id)}))})]})}),(0,t.jsx)(j.Z,{p:2,children:(0,t.jsx)(W.Z,{component:"div",count:D.length,onPageChange:function(n,e){a(e)},onRowsPerPageChange:function(n){l(parseInt(n.target.value))},page:i,rowsPerPage:s,rowsPerPageOptions:[5,10,25,30]})})]})};Q.propTypes={cryptoOrders:L().array.isRequired},Q.defaultProps={cryptoOrders:[]};var X=Q;var Y=function(){var n=(0,p.useState)([]),e=n[0],r=n[1],i=(0,a.a)().update;return(0,p.useEffect)((function(){var n=function(){var n=(0,l.Z)((function(){return(0,u.__generator)(this,(function(n){switch(n.label){case 0:return[4,(0,h.Y1)().then((function(n){var e=n.data.data,t=[];e.map((function(n){t.push({id:n.transaction.id,pack:n.pack_list.description,uuid:n.uuid,username:n.username,password:n.password,server:n.server,name:n.name,phone:n.phone,note:n.note,status:n.transaction.status,created_at:n.transaction.created_at})})),r(t)}))];case 1:return n.sent(),[2]}}))}));return function(){return n.apply(this,arguments)}}();n()}),[i]),(0,t.jsx)(d.Z,{sx:{mb:5},children:(0,t.jsx)(X,{cryptoOrders:e})})},V=r(83512),$=r(65582),J=r(9008),K=r.n(J);function nn(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(K(),{children:(0,t.jsx)("title",{children:"Qu\u1ea3n l\xfd n\u1ea1p"})}),(0,t.jsx)(i.Z,{children:(0,t.jsx)(s,{})}),(0,t.jsx)($.Z,{maxWidth:"lg",children:(0,t.jsx)(o.ZP,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:(0,t.jsx)(o.ZP,{item:!0,xs:12,children:(0,t.jsx)(Y,{})})})})]})}nn.getLayout=function(n){return(0,t.jsx)(V.Z,{children:n})};var en=nn},29268:function(n,e,r){"use strict";r.d(e,{Z:function(){return d}});var t=r(26042),i=r(85893),a=r(87357),o=r(50657),c=r(6514),s=r(37645),l=r(54776),u=r(67294).forwardRef((function(n,e){return(0,i.jsx)(l.Z,(0,t.Z)({direction:"up",ref:e},n))}));function d(n){var e=n.icon,r=n.title,t=n.children,l=n.handleCloseDialog,d=n.openDialog,h=n.handleOpenDialog;return(0,i.jsxs)("div",{children:[(0,i.jsx)(a.Z,{onClick:h,children:e}),(0,i.jsxs)(o.Z,{fullWidth:!0,maxWidth:"md",open:d,TransitionComponent:u,keepMounted:!0,onClose:l,"aria-describedby":"alert-dialog-slide-description",children:[(0,i.jsx)(s.Z,{children:r}),(0,i.jsx)(c.Z,{children:t})]})]})}},82601:function(n,e,r){"use strict";var t=r(82175);e.Z=function(n,e,r){return(0,t.TA)({initialValues:e,validationSchema:n,onSubmit:r,enableReinitialize:!0})}},33829:function(n,e,r){"use strict";var t=r(85893);e.Z=function(n){var e=n.formik,r=n.children;return(0,t.jsx)("div",{children:(0,t.jsx)("form",{onSubmit:e.handleSubmit,children:r})})}},76891:function(n,e,r){"use strict";var t=r(26042),i=r(69396),a=r(99534),o=r(85893),c=r(50135),s=r(30431);e.Z=function(n){var e=n.formik,r=n.name,l=n.label,u=n.options,d=(0,a.Z)(n,["formik","name","label","options"]);return(0,o.jsx)(c.Z,(0,i.Z)((0,t.Z)({fullWidth:!0,name:r,label:l,select:!0,value:e.values&&e.values[r],onChange:e.handleChange,error:e.touched[r]&&Boolean(e.errors[r]),helperText:e.touched[r]&&e.errors[r],InputLabelProps:{shrink:!0}},d),{children:u.map((function(n){return(0,o.jsx)(s.Z,{value:n.value,children:n.title},n.value)}))}))}},2058:function(n,e,r){"use strict";var t=r(26042),i=r(69396),a=r(99534),o=r(85893),c=r(45697),s=r.n(c),l=(0,r(90948).ZP)("span")((function(n){var e=n.theme;return"\n      background-color: ".concat(e.colors.alpha.black[5],";\n      padding: ").concat(e.spacing(.5,1),";\n      font-size: ").concat(e.typography.pxToRem(13),";\n      border-radius: ").concat(e.general.borderRadius,";\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      max-height: ").concat(e.spacing(3),";\n      \n      &.MuiLabel {\n        &-primary {\n          background-color: ").concat(e.colors.primary.lighter,";\n          color: ").concat(e.palette.primary.main,"\n        }\n\n        &-black {\n          background-color: ").concat(e.colors.alpha.black[100],";\n          color: ").concat(e.colors.alpha.white[100],";\n        }\n        \n        &-secondary {\n          background-color: ").concat(e.colors.secondary.lighter,";\n          color: ").concat(e.palette.secondary.main,"\n        }\n        \n        &-success {\n          background-color: ").concat(e.colors.success.lighter,";\n          color: ").concat(e.palette.success.main,"\n        }\n        \n        &-warning {\n          background-color: ").concat(e.colors.warning.lighter,";\n          color: ").concat(e.palette.warning.main,"\n        }\n              \n        &-error {\n          background-color: ").concat(e.colors.error.lighter,";\n          color: ").concat(e.palette.error.main,"\n        }\n        \n        &-info {\n          background-color: ").concat(e.colors.info.lighter,";\n          color: ").concat(e.palette.info.main,"\n        }\n      }\n")})),u=function(n){n.className;var e=n.color,r=void 0===e?"secondary":e,c=n.children,s=(0,a.Z)(n,["className","color","children"]);return(0,o.jsx)(l,(0,i.Z)((0,t.Z)({className:"MuiLabel-"+r},s),{children:c}))};u.propTypes={children:s().node,className:s().string,color:s().oneOf(["primary","black","secondary","error","warning","success","info"])},e.Z=u},37652:function(n,e,r){"use strict";var t=r(85893),i=r(45697),a=r.n(i),o=r(90948),c=r(87357),s=r(65582),l=(0,o.ZP)(c.Z)((function(n){var e=n.theme;return"\n        padding: ".concat(e.spacing(4),";\n")})),u=function(n){var e=n.children;return(0,t.jsx)(l,{className:"MuiPageTitle-wrapper",children:(0,t.jsx)(s.Z,{maxWidth:"lg",children:e})})};u.propTypes={children:a().node.isRequired},e.Z=u}},function(n){n.O(0,[7352,4424,1023,5228,7709,153,135,1141,5547,4922,3512,9774,2888,179],(function(){return e=83543,n(n.s=e);var e}));var e=n.O();_N_E=e}]);