package aica.starter.io;

import android.os.Build;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    if(android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.S){
      int color = getColor(R.color.splashBackground);
      this.bridge.getWebView().setBackgroundColor(color);
      getWindow().setStatusBarColor(color);
    }
  }
}
