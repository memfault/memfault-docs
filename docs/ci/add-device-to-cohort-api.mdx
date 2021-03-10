---
id: add-device-to-cohort-api
title: Adding a Device to a Cohort - API
sidebar_label: Adding a Device to a Cohort - API
---

This short step-by-step tutorial will give an example flow of adding a Device to
a Cohort using the API. This would be ideal for a Continuous Integration setup.

## Prerequisites

- Make sure to have Authentication set up. This should be using HTTP Basic Auth
  - Find this information at
    [https://api-docs.memfault.com/?version=latest#authentication](https://api-docs.memfault.com/?version=latest#authentication)
- A Project must already be created

## Make sure the Device Exists

We first want to make sure the Device exists. If we don't get a successful query
here, the Device should be created first.

**Reference**:
[https://api-docs.memfault.com/?version=latest#eee1c8ba-0bf5-42c9-8071-814ece0f6505](https://api-docs.memfault.com/?version=latest#eee1c8ba-0bf5-42c9-8071-814ece0f6505)

**Example**:

    # Request
    curl --location --request GET https://api.memfault.com/api/v0/organizations/memfault/projects/demo/devices/ABCD1234

    # Response
    {
      "data": {
        "cohort": {
          "count_devices": 3,
          "id": 2,
          "name": "default",
          "slug": "default"
        },
        "created_date": "2019-04-29T23:01:18.280949+00:00",
        "device_serial": "ABCD1234",
        "hardware_version": "hwrev1",
        "id": 16,
        "last_seen": null,
        "last_seen_release": null,
        "latest_install": null,
        "latest_trace": null,
        "owner_ref": "",
        "updated_date": "2019-04-29T23:01:18.280973+00:00"
      }
    }

## Create Device

We can call the API to create the Device

**Reference**:
[https://api-docs.memfault.com/?version=latest#f2acc282-23f9-409b-a99b-41da759b82f9](https://api-docs.memfault.com/?version=latest#f2acc282-23f9-409b-a99b-41da759b82f9)

**Example**:

    # Request
    curl -X POST \
      https://api.memfault.com/api/v0/organizations/memfault/projects/demod/devices \
      -H 'Content-Type: application/json' \
      -d '{
    	  "device_serial": "ABCD1234",
    	  "hardware_version": "proto"
      }'

    # Response - HTTP 200
    {
        "data": {
            "cohort": {
                "count_devices": 1,
                "id": 20,
                "name": "default",
                "slug": "default"
            },
            "created_date": "2019-05-21T14:53:32.810978+00:00",
            "device_serial": "ABCD1234",
            "hardware_version": "proto",
            "id": 415,
            "last_seen": null,
            "last_seen_release": null,
            "latest_install": null,
            "latest_trace": null,
            "owner_ref": "",
            "updated_date": "2019-05-21T14:53:32.810984+00:00"
        }
    }

If we wanted, we can also always create a Device and check for either a
`200 - OK` or a `409 - CONFLICT`

## Make Sure Cohort Exists

**Reference**:
[https://api-docs.memfault.com/?version=latest#982c7b0f-b668-41cd-8bf1-fa4758beb278](https://api-docs.memfault.com/?version=latest#982c7b0f-b668-41cd-8bf1-fa4758beb278)

**Example**:

    # Request
    curl -X POST \
      https://api.memfault.com/api/v0/organizations/memfault-ci/projects/smart-sink/cohorts \
      -H 'Content-Type: application/json' \
      -H 'cache-control: no-cache' \
      -d '{
    	  "name": "Beta",
              "slug": "f8e70b92"
          }'

    # Response
    {
        "data": {
            "count_devices": 0,
            "created_date": "2019-05-21T14:59:07.733062+00:00",
            "id": 22,
            "last_deployment": null,
            "name": "Beta",
            "slug": "f8e70b92",
            "updated_date": "2019-05-21T14:59:07.733070+00:00"
        }
    }

To ensure this Cohort always exists, we can call Create Cohort each time and
check for either a `200 - OK` or a `409 - CONFLICT`

## Add Device to Cohort

Next we'll update the Device to belong to the proper Cohort

**Reference**:
[https://api-docs.memfault.com/?version=latest#f4e2584a-36f2-4184-82ec-3b9d0108588c](https://api-docs.memfault.com/?version=latest#f4e2584a-36f2-4184-82ec-3b9d0108588c)

**Example**:

    # Request
    curl -X PATCH \
      https://api.memfault.com/api/v0/organizations/memfault/projects/demo/devices/ABCD1234 \
      -H 'Content-Type: application/json' \
      -H 'cache-control: no-cache' \
      -d '{
    	"cohort": "f8e70b92"
    }'

    # Response
    {
      "data": {
        "cohort": {
          "count_devices": 3,
          "id": 3,
          "name": "Beta",
          "slug": "f8e70b92"
        },
        "created_date": "2019-04-29T23:01:18.280949+00:00",
        "device_serial": "ABCD1234",
        "hardware_version": "hwrev1",
        "id": 16,
        "last_seen": null,
        "last_seen_release": null,
        "latest_install": null,
        "latest_trace": null,
        "owner_ref": "",
        "updated_date": "2019-05-21T00:41:54.926599+00:00"
      }
    }

Notice the Device's Cohort now is "Beta"
