## Add sources to Make Build System

If you are using make, `${MEMFAULT_FIRMWARE_SDK}makefiles/MemfaultWorker.mk` can
be used to very easily collect the source files and include paths required by
the SDK.

```
MEMFAULT_SDK_ROOT := <The to the root of this repo from your project>
MEMFAULT_COMPONENTS := <The SDK components to be used, i.e "core util">
include $(MEMFAULT_SDK_ROOT)/makefiles/MemfaultWorker.mk
<YOUR_SRC_FILES> += $(MEMFAULT_COMPONENTS_SRCS)
<YOUR_INCLUDE_PATHS> += $(MEMFAULT_COMPONENTS_INC_FOLDERS)
```
