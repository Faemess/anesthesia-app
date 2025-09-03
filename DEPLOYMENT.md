# Deployment Guide - Anesthesia Management App

This guide provides instructions for deploying the React Native Anesthesia Management App to various platforms.

## Development Server (Current Status)

The app is currently running on the development server and can be accessed at:
- **Web Version**: https://8081-i3itfoijxrjjuo4koo34y-41fada49.manus.computer
- **Expo Development Server**: Port 8081

## Platform Deployment Options

### 1. Expo Go (Easiest - For Testing)

**For Mobile Testing:**
1. Install Expo Go app on your mobile device
2. Scan the QR code from the development server
3. The app will load directly on your device

**Pros:**
- Instant testing on real devices
- No app store submission required
- Easy sharing with team members

**Cons:**
- Requires Expo Go app
- Limited to Expo SDK features
- Not suitable for production distribution

### 2. Expo Application Services (EAS) - Recommended for Production

**Prerequisites:**
```bash
npm install -g @expo/cli
expo login
```

**Build for iOS:**
```bash
expo build:ios
```

**Build for Android:**
```bash
expo build:android
```

**Pros:**
- Professional app store distribution
- Custom app icons and splash screens
- Push notifications support
- Over-the-air updates

**Cons:**
- Requires Expo account
- Build times can be longer
- May require Apple Developer account for iOS

### 3. Expo Web Deployment

**Build for Web:**
```bash
expo build:web
```

**Deploy to Netlify/Vercel:**
```bash
# After building
npm run build
# Upload dist/ folder to hosting service
```

**Pros:**
- Accessible via web browsers
- No app store approval needed
- Easy to update and maintain

**Cons:**
- Limited mobile-specific features
- Requires internet connection

### 4. Ejecting to React Native CLI (Advanced)

**If you need full native control:**
```bash
expo eject
```

**Then follow standard React Native deployment:**
- iOS: Xcode and App Store Connect
- Android: Android Studio and Google Play Console

**Pros:**
- Full access to native features
- Custom native modules
- Complete control over build process

**Cons:**
- More complex setup
- Requires native development knowledge
- Loses Expo convenience features

## Production Deployment Checklist

### Pre-Deployment
- [ ] Test all features thoroughly
- [ ] Verify drug calculations accuracy
- [ ] Test language switching functionality
- [ ] Validate form inputs and error handling
- [ ] Test emergency protocols
- [ ] Review medical disclaimer content

### App Store Preparation
- [ ] Create app icons (1024x1024 for iOS, various sizes for Android)
- [ ] Design splash screen
- [ ] Write app store descriptions
- [ ] Prepare screenshots for different device sizes
- [ ] Set up app store accounts (Apple Developer, Google Play)

### Configuration Updates
- [ ] Update app.json with production settings
- [ ] Set proper app name and bundle identifier
- [ ] Configure privacy permissions
- [ ] Set up analytics (if required)
- [ ] Configure crash reporting

### Security Considerations
- [ ] Review data storage practices
- [ ] Ensure HIPAA compliance (if applicable)
- [ ] Implement proper error logging
- [ ] Add medical disclaimer screens
- [ ] Consider offline data handling

## Environment-Specific Configurations

### Development
```json
{
  "expo": {
    "name": "Anesthesia Management (Dev)",
    "slug": "anesthesia-app-dev",
    "version": "1.0.0-dev"
  }
}
```

### Production
```json
{
  "expo": {
    "name": "Anesthesia Management",
    "slug": "anesthesia-app",
    "version": "1.0.0",
    "privacy": "unlisted"
  }
}
```

## Recommended Deployment Strategy

### Phase 1: Internal Testing
1. Use Expo Go for initial team testing
2. Gather feedback from medical professionals
3. Iterate on features and calculations

### Phase 2: Beta Testing
1. Build with EAS for limited distribution
2. TestFlight (iOS) or Internal Testing (Android)
3. Collect user feedback and bug reports

### Phase 3: Production Release
1. Final testing and medical review
2. App store submission
3. Marketing and training materials
4. Gradual rollout to medical staff

## Monitoring and Updates

### Over-the-Air Updates (Expo)
```bash
expo publish
```

### App Store Updates
- Follow platform-specific update procedures
- Consider staged rollouts for major changes
- Maintain backward compatibility

### Analytics and Monitoring
- Implement crash reporting (Sentry, Bugsnag)
- Monitor app performance
- Track feature usage
- Collect user feedback

## Support and Maintenance

### Regular Updates
- Keep Expo SDK updated
- Update medical protocols as needed
- Security patches and bug fixes
- Performance optimizations

### Medical Content Updates
- Regular review of drug calculations
- Update emergency protocols
- Add new features based on user feedback
- Compliance with medical standards

## Troubleshooting Common Issues

### Build Failures
- Check Expo SDK compatibility
- Verify all dependencies are compatible
- Clear cache: `expo r -c`

### Performance Issues
- Optimize images and assets
- Implement lazy loading
- Monitor memory usage
- Profile with React Native tools

### Platform-Specific Issues
- Test on multiple devices
- Check platform-specific permissions
- Verify native module compatibility

## Contact Information

For deployment support or questions:
- Technical Issues: Contact development team
- Medical Content: Consult medical advisory board
- Compliance: Review with legal/compliance team

---

**Note**: Always ensure compliance with local medical software regulations and institutional policies before deploying in clinical environments.

