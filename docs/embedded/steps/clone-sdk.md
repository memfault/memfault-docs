The `memfault-firmware-sdk` is a self-contained C SDK you will need to include
into your project.

Create a folder to hold `memfault-firmware-sdk` as well as the configuration and
porting files to your platform.

```bash
cd ${YOUR_PROJECT_DIR}
mkdir -p third_party/memfault

cd third_party/memfault
touch memfault_platform_port.c
touch memfault_platform_coredump_regions.c
touch memfault_platform_config.h
touch memfault_trace_reason_user_config.def
touch memfault_metrics_heartbeat_config.def
touch memfault_platform_log_config.h
touch memfault_platform_config.h

# Add memfault repo as submodule, subtree, or copy in as source directly
git submodule add https://github.com/memfault/memfault-firmware-sdk.git memfault-firmware-sdk
```

When you are done, you should have the following directory structure in your
project:

```
memfault/
//...
├── memfault-firmware-sdk (submodule)
| # Files where port to your platform will be implemented
├── memfault_platform_port.c
├── memfault_platform_coredump_regions.c
|
| # Configuration Headers
├── memfault_metrics_heartbeat_config.def
└── memfault_trace_reason_user_config.def
└── memfault_platform_log_config.h
└── memfault_platform_config.h
```
