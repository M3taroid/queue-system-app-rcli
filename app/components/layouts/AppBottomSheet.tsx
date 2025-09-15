// import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet"
// import React, { forwardRef, ReactNode, useCallback, useMemo } from "react"
// import { View } from "react-native"
// import {Colors} from "../../constants";
//
// type PropsType = {
//     child: ReactNode
//     snapPoints?: string[]
//     isScrollableView?: boolean
//     onClose?: () => void
// }
//
// type Ref = BottomSheet
//
// const AppBottomSheet = forwardRef<Ref, PropsType>((props, ref) => {
//     const { isScrollableView, child, snapPoints = ["85%"], onClose } = props
//     const points = useMemo(() => snapPoints, [snapPoints])
//     const colors  = Colors['light']
//
//     const renderBackdrop = useCallback(
//         (_props: any) => (
//             <BottomSheetBackdrop {..._props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.1} pressBehavior="close" />
//         ),
//         [],
//     )
//
//     return (
//         <BottomSheet
//             ref={ref}
//             index={-1}
//             snapPoints={points}
//             onClose={onClose}
//             enablePanDownToClose
//             handleIndicatorStyle={{ backgroundColor: colors.primary }}
//             backgroundStyle={{ backgroundColor: colors.background }}
//             backdropComponent={renderBackdrop}
//         >
//             {isScrollableView ? (
//                 <BottomSheetScrollView
//                     style={{
//                         paddingBottom: 9,
//                         backgroundColor: colors.pageBackground,
//                     }}
//                 >
//                     {child}
//                 </BottomSheetScrollView>
//             ) : (
//                 <View
//                     style={{
//                         flex: 1,
//                         backgroundColor: colors.pageBackground,
//                     }}
//                 >
//                     {child}
//                 </View>
//             )}
//         </BottomSheet>
//     )
// })
//
// export default AppBottomSheet

import {View} from "react-native";

const AppBottomSheet = () => {
    return <View />
}
export default AppBottomSheet;