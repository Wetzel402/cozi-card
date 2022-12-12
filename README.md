# Cozi Card

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Configuration](#configuration)

<a name="introduction"></a>
## Introduction
A custom Lovelace card for [Home
Assistant](https://www.home-assistant.io/) to be used with the [hass-cozi custom component](https://github.com/Wetzel402/hass-cozi)

![Cozi Card](https://github.com/Wetzel402/cozi-card/blob/master/cozi-card.png?raw=true)

<a name="installation"></a>
## Installation

#### HACS
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

Add this repository to HACS and install.

<a name="configuration"></a>
## Configuration

#### UI
Select a list from the drop down.  You can overide the list name with an optional name.

#### Manual
And add a card with type `custom:cozi-card`:

```yaml
type: custom:cozi-card
list:
  - 6 #index of the list
  - Test list #list name
  - dc49c96f-94c7-4181-ac2e-0c7bdb209605 #Cozi listId
  - shopping #Cozi listType
```