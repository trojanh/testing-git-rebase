#!/usr/bin/env python

# Utility script to set the versionCode and CFBundleVersion attributes in Cordova's config.xml
#
# GooglePlay:
# Google Play expects version numbers of uploaded binaries to always increase.
# Not setting versionCode falls back on Cordova's version code calculation which restricts
# uploading multiple apks for a given MAJOR.MINOR.PATCH combination
#
# iTunesConnect:
# iTunesConnect allows uploading multiple builds for a given MAJOR.MINOR.PATCH.
# Not specifying CFBundleVersion sets the build number to the same as version number
#
# For android builds, versionCode is set to CircleCI build number.
# Cordova build will suffix 8 or 9 based on SDK version supported.
# For ex, a Circle CI build 1800 will map to version 18008 on Google Play.
# For iOS builds, CFBundleVersion is set to the Circle CI build niumber.
# There is a one to one mapping to the build number on iTunesConnect

import os
import sys
from xml.etree import ElementTree

def get_circleci_build():
    build_number = os.getenv('CIRCLE_BUILD_NUM')
    if not build_number:
        print "Missing build number, skip updating"
        sys.exit()
    return build_number

def get_ios_build_no():
    return get_circleci_build()

def get_android_build_no():
    return get_circleci_build()

cordova_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..'))
config_xml_path = os.path.join(cordova_path, 'config.xml')
android_build_no = get_android_build_no()
ios_build_no = get_ios_build_no()

ElementTree.register_namespace('', 'http://www.w3.org/ns/widgets')
tree = ElementTree.parse(config_xml_path)
root = tree.getroot()

root.attrib['android-versionCode'] = android_build_no
root.attrib['ios-CFBundleVersion'] = ios_build_no

tree.write(config_xml_path)

print "Updated versionCode to {} and CFBundleVersion to {}".format(android_build_no, ios_build_no)
