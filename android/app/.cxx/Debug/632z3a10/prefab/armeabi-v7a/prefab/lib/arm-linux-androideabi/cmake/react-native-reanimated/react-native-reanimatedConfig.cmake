if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "/home/bcs/Pictures/loyaltyapp/frontend/loyaltyapp_frontend/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/3m392w5e/obj/armeabi-v7a/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/bcs/Pictures/loyaltyapp/frontend/loyaltyapp_frontend/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

