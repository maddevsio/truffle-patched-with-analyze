#!/bin/bash
# npm preinstall script.
# does additional stuff for local (not global) installs
# DOES NOT WORK YET though.
if [[ ! -d node_modules ]] ; then
    # This can happen when installing locally
    # we have:
    #  node_modules
    #     |- truffle-plus-analyze [need a node-modules here]
    #     |- truffle-core ...
    if [[ -d packages ]] ; then
	ln -vs packages node_modules
    fi
fi
