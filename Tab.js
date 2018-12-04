/**
 * @author Luke Brandon Farrell
 * @description Configures all tabs. This can only be passed Tabs (from Tab.js) as children
 */

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import TextWith from "react-native-text-with";

export class Tab extends React.Component {
  /**
   * [ Built-in React method. ]
   *
   * Allows us to render JSX to the screen
   */
  render() {
    /** Props */
    const {
      children,
      icon,
      iconActive,
      label,
      tabSelected,
      tabTextColor,
      tabUnderlineColor,
      tabBackgroundColor,
      tabSelectedUnderlineColor,
      tabSelectedBackgroundColor,
      tabSelectedTextColor,
      tabOnPress,
      tabTextStyle,
      ...extraProps
    } = this.props;
    /** Styles */
    const { tabDefaultStyle } = styles;
    /** Variables */
    const tabStyle = {
      backgroundColor: tabSelected
        ? tabSelectedBackgroundColor
        : tabBackgroundColor,
      borderBottomColor: tabSelected
        ? tabSelectedUnderlineColor
        : tabUnderlineColor,
      borderBottomWidth: 3
    };

    /*
     * If children are passed to this component them we return them.
     * No custom modification is needed.
     */
    if (children) return children;

    /*
     * Else: we build an opinionated tab for the user.
     */
    return (
      <TouchableOpacity
        onPress={tabOnPress}
        style={[tabDefaultStyle, tabStyle]}
        {...extraProps}
      >
        <TextWith
          object={tabSelected ? iconActive : icon}
          textStyle={[
            {
              color: tabSelected ? tabSelectedTextColor : tabTextColor
            },
            tabTextStyle
          ]}
        >
          {label}
        </TextWith>
      </TouchableOpacity>
    );
  }
}

/** Styles */
const styles = StyleSheet.create({
  tabDefaultStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

/** Default Props */
Tab.defaultProps = {
  tabSelected: false,
  tabTextColor: "#222222",
  tabUnderlineColor: "#FFF",
  tabBackgroundColor: "#FFF",
  tabSelectedTextColor: "#CD2C2E",
  tabSelectedUnderlineColor: "#CD2C2E",
  tabSelectedBackgroundColor: "#FFF"
};

/** Prop Types */
Tab.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.any,
  iconActive: PropTypes.any,
  tabSelected: PropTypes.bool.isRequired,
  tabTextColor: PropTypes.string,
  tabUnderlineColor: PropTypes.string,
  tabBackgroundColor: PropTypes.string,
  tabSelectedTextColor: PropTypes.string,
  tabSelectedUnderlineColor: PropTypes.string,
  tabSelectedBackgroundColor: PropTypes.string,
  tabOnPress: PropTypes.func,
  tabTextStyle: PropTypes.any
};
