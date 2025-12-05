if(NOT TARGET react-native-worklets::worklets)
add_library(react-native-worklets::worklets SHARED IMPORTED)
set_target_properties(react-native-worklets::worklets PROPERTIES
    IMPORTED_LOCATION "/home/bcs/Music/loyaltyapp/frontend/loyaltyapp_frontend/node_modules/react-native-worklets/android/build/intermediates/cxx/Debug/16703g1e/obj/x86_64/libworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/bcs/Music/loyaltyapp/frontend/loyaltyapp_frontend/node_modules/react-native-worklets/android/build/prefab-headers/worklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

