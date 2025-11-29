if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/home/dell/.gradle/caches/9.0.0/transforms/3c329dea25fb4a725e192bea79b72b5c/transformed/hermes-android-0.82.0-debug/prefab/modules/hermesvm/libs/android.armeabi-v7a/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/dell/.gradle/caches/9.0.0/transforms/3c329dea25fb4a725e192bea79b72b5c/transformed/hermes-android-0.82.0-debug/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

