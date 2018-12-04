/**
 * @author Luke Brandon Farrell
 * @description Configures all tabs. This can only be passed Tabs (from Tab.js) as children
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";

export class TabControl extends React.Component {
  /**
   * [ Built-in React method. ]
   *
   * Setup the component. Executes when the component is created
   *
   * @param {object} props
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      tabSelected: "all"
    };

    this.onPress = this.onPress.bind(this);
  }

  /**
   * [ Built-in React method. ]
   *
   * Allows us to render JSX to the screen
   */
  render() {
    /** Style */
    const { tabControlStyle } = styles;
    /** Props */
    const {
      children,
      scrollable,
      tabTextColor,
      tabUnderlineColor,
      tabBackgroundColor,
      tabSelectedTextColor,
      tabSelectedUnderlineColor,
      tabSelectedBackgroundColor,
      tabTextStyle,
      ...extraProps
    } = this.props;
    /** State */
    const { tabSelected } = this.state;
    /** Variables */

    /*
     * The method below filters all children passed to this component
     * removing the ones which are not Tabs (from Tab.js). Maps each
     * child and clones the element to add custom props and control
     * the selected tabs and onPres behaviour.
     */
    const tabs = children.map((element, index) => {
      // We create a onPress to control each tabs action
      const onPress = () => this.onPress(element.props);

      return React.cloneElement(element, {
        key: index,
        tabSelected: tabSelected === element.props.id,
        tabTextColor,
        tabUnderlineColor,
        tabBackgroundColor,
        tabSelectedTextColor,
        tabSelectedUnderlineColor,
        tabSelectedBackgroundColor,
        tabTextStyle,
        tabOnPress: onPress
      });
    });

    /*
     * If scrollable is true, we wrap the tabs
     * in a horizontal scroll view
     */
    if (scrollable)
      return (
        <ScrollView
          {...extraProps}
          horizontal
          bounces
          showsHorizontalScrollIndicator={false}
        >
          {tabs}
        </ScrollView>
      );

    /*
    * Use Flex to fit tabs to screen
    */
    return (
      <View style={tabControlStyle} {...extraProps}>
        {tabs}
      </View>
    );
  }

  /**
   * Selects a tab based on the ID passed via the parameter.
   *
   * @param id - ID of the tab being pressed
   */
  onPress({ id }) {
    this.setState({ tabSelected: id });
    this.props.onChange(id);
  }
}

/** Styles */
const styles = StyleSheet.create({
  tabControlStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    flexDirection: "row"
  }
});

/** Default Props */
TabControl.defaultProps = {
  scrollable: true
};

/** Prop Types */
TabControl.propTypes = {
  scrollable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  tabTextColor: PropTypes.string,
  tabUnderlineColor: PropTypes.string,
  tabBackgroundColor: PropTypes.string,
  tabSelectedTextColor: PropTypes.string,
  tabSelectedUnderlineColor: PropTypes.string,
  tabSelectedBackgroundColor: PropTypes.string,
  tabTextStyle: PropTypes.any
};
